import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
import datetime
import math
import random
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import MinMaxScaler
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.layers.experimental import preprocessing

def clean_data(data, modelsDir):

    # Loading file with models
    models = pd.read_csv(modelsDir)
    models['model'] = models['model'].str.upper()

    # Renaming product model for consistency
    data['model'] = data['model'].str.upper()
    data['brand'] = data['brand'].str.upper()
    data['type'] = data['type'].str.upper()
    data['availability'] = data['availability'].str.upper()

    for dt in data.itertuples():
        for model in models.itertuples():
            if dt.model.find(str(model.model)) != -1:
                data.at[dt.Index, 'model'] = model.Index
                continue

    # Removing models which dont havent been renamed
    data = data.replace('', np.nan)
    data = data.dropna()

def encode_data(data):
    def split_date(date):
        year = int(date[:4])
        month = int(date[4:6])
        day_month = int(date[6:8])
        week = datetime.date(year, month, day_month).isocalendar()[1]
        day_week = datetime.date(year, month, day_month).isocalendar()[2]
        day_year = day_week * week
        quarter = math.ceil(float(month)/3)
        return year, month, quarter, week, day_year, day_month, day_week
    
    # Splitting data into diff components
    
    for dt in data.itertuples():
        year, month, quarter, week, day_year, day_month, day_week = split_date(str(dt.date))
        data.at[dt.Index, 'year'] = year
        data.at[dt.Index, 'month'] = month
        data.at[dt.Index, 'quarter'] = quarter
        data.at[dt.Index, 'week'] = week
        data.at[dt.Index, 'day_year'] = day_year
        data.at[dt.Index, 'day_month'] = day_month
        data.at[dt.Index, 'day_week'] = day_week    

    del data['date']

    label_encoder = LabelEncoder()
    data['brand'] = label_encoder.fit_transform(data['brand'])
    data['model'] = label_encoder.fit_transform(data['model'])
    data['type'] = label_encoder.fit_transform(data['type'])

    enc_brand = pd.get_dummies(data.brand, prefix='brand')
    del data['brand']
    data = pd.concat([data, enc_brand], axis=1)

    enc_model = pd.get_dummies(data.model, prefix='model')
    del data['model']
    data = pd.concat([data, enc_model], axis=1)

    enc_type = pd.get_dummies(data.type, prefix='type')
    del data['type']
    data = pd.concat([data, enc_type], axis=1)

    avail = set(data['availability'].str.upper())
    avail = pd.DataFrame(avail)
    avail = avail.rename(columns={0: 'availability'})

    for av in avail.itertuples():
        data.loc[data['availability'].str.upper() == av.availability, 'availability'] = av.Index
    
    return data


if __name__ == '__main__':
    df_cpu = pd.read_csv('../../model_data/cpuProductData.csv')
    df_gpu = pd.read_csv('../../model_data/gpuProductData.csv')

    clean_data(df_cpu, '../../model_data/cpuModels.csv')
    clean_data(df_gpu, '../../model_data/gpuModels.csv')

    df_prods = df_cpu.append(df_gpu, ignore_index=True)
    df_prods = encode_data(df_prods)

    train_set = df_prods.sample(frac=0.8, random_state=5)
    test_set = df_prods.drop(train_set.index)

    x_train = train_set.copy()
    x_test = test_set.copy()

    y_train = x_train.pop('availability')
    y_test = x_test.pop('availability')

    x_test = np.array(x_test)

    y_train = np.array(y_train)
    y_test = np.array(y_test)

    y_test_labels = y_test.copy()

    y_train = np.reshape(y_train, (-1, 1))
    y_test = np.reshape(y_test, (-1, 1))

    scaler_x = MinMaxScaler()
    scaler_y = MinMaxScaler()

    scaler_x.fit(x_train)
    x_train = scaler_x.transform(x_train)

    scaler_x.fit(x_test)
    x_test = scaler_x.transform(x_test)

    scaler_y.fit(y_train)
    y_train = scaler_y.transform(y_train)

    scaler_y.fit(y_test)
    y_test = scaler_y.transform(y_test)

    data_length = len(x_train[0])

    model = keras.Sequential([
        layers.Dense(data_length + 1, input_dim=data_length, kernel_initializer='normal', activation='relu'),
        layers.Dense(data_length*8, activation='relu'),
        layers.Dense(data_length*3, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(2, activation='softmax')
    ])

    model.compile(
        optimizer=tf.optimizers.SGD(learning_rate=0.005, momentum=0.9, nesterov=True),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    history = model.fit(
        x_train,
        y_train,
        epochs=500,
        verbose=0,
        batch_size=150,
        shuffle=True,
        validation_split=0.2
    )

    metrics = model.evaluate(x_test, y_test)
    with open('../../nn_utilities/scalar_avail', 'wb') as f:
        pickle.dump(scaler_y, f)
    model.save('../../trained_models/avail_prediction.h5')
    print('Accuracy on test set:', metrics[1])