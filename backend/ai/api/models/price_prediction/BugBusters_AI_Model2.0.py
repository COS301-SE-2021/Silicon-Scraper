import keras as keras
import numpy as np
import pandas as pd
import datetime
import math
import sklearn.model_selection as sk
import sklearn.preprocessing as sp
from keras import layers
from matplotlib import pyplot as plt

# import sklearn.preprocessing as sp
# import sys
# sys.path.insert(1, '/price_prediction/models/ai/')
# from backend.ai.nn_utilies.dataEncoding import encode_data
# from nn_utilies.dataEncoding import *
# import dataEncoding as de

#
# This function cleans the given data, by merging it with the model and getting rid of null rows
#
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


def split_date(date):
    year = int(date[:4])
    month = int(date[4:6])
    day_month = int(date[6:8])
    week = datetime.date(year, month, day_month).isocalendar()[1]
    day_week = datetime.date(year, month, day_month).isocalendar()[2]
    day_year = day_week * week
    quarter = math.ceil(float(month) / 3)
    return year, month, quarter, week, day_year, day_month, day_week


def encode_data(data):
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

    label_encoder = sp.LabelEncoder()
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


def getModelData():
    gpuModels = pd.read_csv("../../model_data/gpuModels.csv")
    cpuModels = pd.read_csv("../../model_data/cpuModels.csv")
    brands = pd.read_csv("../../model_data/brands.csv")

    models = gpuModels.append(cpuModels)
    models = models.drop(columns=['id'])
    label_encoder = sp.LabelEncoder()
    models['model_code'] = label_encoder.fit_transform(models['model'])
    enc_models = pd.get_dummies(models.model_code, prefix='m')
    models = pd.concat([models, enc_models], axis=1)

    label_encoder = sp.LabelEncoder()
    brands['brand_code'] = label_encoder.fit_transform(brands['brand'])
    enc_brands = pd.get_dummies(brands.brand_code, prefix='b')
    brands = pd.concat([brands, enc_brands], axis=1)

    availability = pd.DataFrame(["Out of stock", "In stock"])
    availability = availability.rename(columns={0: "availability"})
    availability['availability_code'] = label_encoder.fit_transform(availability['availability'])
    enc_availability = pd.get_dummies(availability.availability_code, prefix='a')
    availability = pd.concat([availability, enc_availability], axis=1)

    type_ = pd.DataFrame(["cpu", "gpu"])
    type_ = type_.rename(columns={0: "type"})
    type_['type_code'] = label_encoder.fit_transform(type_['type'])
    enc_type = pd.get_dummies(type_.type_code, prefix='t')
    type_ = pd.concat([type_, enc_type], axis=1)

    return models, brands, availability, type_


def getCode(data, code_pd, name):
    for dt in code_pd.itertuples():
        if data.upper().find(str(dt[1])) != -1:
            return code_pd[code_pd[name] == str(dt[1])]


#
# This function takes in a json product data and encodes it for price and availability prediction
#
def encode_data(brand, model, availability_, price, type_d, timestamp):
    models, brands, type_, availability = getModelData()
    year, month, quarter, week, day_year, day_month, day_week = split_date(timestamp)
    d1 = getCode(model, models, "model").drop(columns=["model", "model_code"])
    print(d1)
    print(brand)

    d2 = getCode(brand, brands, "brand").drop(columns=["brand", "brand_code"])
    d3 = type_[type_["type"] == type_d].drop(columns=["type", "type_code"])
    d4 = availability[availability["availability"] == availability_].drop(columns=["availability", "availability_code"])
    data_ = pd.DataFrame([{"price": price}])
    d1.reset_index(drop=True, inplace=True)
    d2.reset_index(drop=True, inplace=True)
    d3.reset_index(drop=True, inplace=True)
    d4.reset_index(drop=True, inplace=True)
    data_2 = pd.concat([data_, d1, d2, d3], axis=1)
    data_ = pd.concat([data_, d1, d2, d3, d4], axis=1)
    data_1 = data_.drop(columns=["price"])

    data_1['year'], data_2['year'] = year
    data_1['month'], data_2['month'] = month
    data_1['quarter'], data_2['quarter'] = quarter
    data_1['week'], data_2['week'] = week
    data_1['day_year'], data_2['day_year'] = day_year
    data_1['day_month'], data_2['day_month'] = day_month
    data_1['day_week'], data_2['day_week'] = day_week

    return data_1, data_2


cpu_data = pd.read_csv("../../model_data/cpuProductData.csv")
gpu_data = pd.read_csv("../../model_data/gpuProductData.csv")


data = gpu_data.append(cpu_data, ignore_index=True)


def encode_training_data(data):
    price_model_data = pd.DataFrame()
    for dt in data.itertuples():
        price_pred_data, avail_pred_data = encode_data(data.at[dt.Index, 'brand'], data.at[dt.Index, 'model'],
                                                       data.at[dt.Index, 'availability'], data.at[dt.Index, 'price'],
                                                       data.at[dt.Index, 'type'],
                                                       data.at[dt.Index, 'date'].astype("str"))
        price_model_data = price_model_data.append(price_pred_data)

    return price_model_data


data = encode_training_data(data)
data = data.dropna()
data_label = data.pop('price')
train_features, test_features, train_labels, test_labels = sk.train_test_split(data, data_label)

train_labels = np.array(train_labels)
test_labels = np.array(test_labels)

y_train = np.reshape(train_labels, (-1, 1))
y_val = np.reshape(test_labels, (-1, 1))
scaler_x = sp.MinMaxScaler()
scaler_y = sp.MinMaxScaler()

xtrain_scale = scaler_x.transform(train_features)

xval_scale = scaler_x.transform(test_features)

ytrain_scale = scaler_y.transform(y_train)

yval_scale = scaler_y.transform(y_val)

model = keras.Sequential([
    layers.Dense(len(xtrain_scale[0]) + 1, input_dim=len(xtrain_scale[0]), kernel_initializer='normal',
                 activation='relu'),
    layers.Dense(399, activation='relu'),
    layers.Dense(399, activation='relu'),
    layers.Dense(1, activation='relu')
])

print(model.summary())

model.compile(loss='mse', optimizer='adam', metrics=['mse', 'mae'])
history = model.fit(xtrain_scale, ytrain_scale, epochs=1000, batch_size=150, verbose=1, validation_split=0.2)
hist = pd.DataFrame(history.history)
hist['epoch'] = history.epoch
print("logs: ", hist.tail())
predictions = model.predict(xval_scale)
predictions = scaler_y.inverse_transform(predictions)
print(predictions)
metrics = model.evaluate(xval_scale, yval_scale)
print(metrics)


def plot_loss(history):
    plt.plot(history.history['loss'], label='loss')
    plt.plot(history.history['val_loss'], label='val_loss')
    plt.xlabel('Epoch')
    plt.ylabel('Error [PRICE]')
    plt.legend()
    plt.grid(True)


plot_loss(history)

a = plt.axes(aspect='equal')
plt.scatter(test_labels, predictions)
plt.xlabel('True Values [PRICE]')
plt.ylabel('Predictions [PRICE]')
plt.plot()

error = predictions - test_labels
plt.hist(error, bins=25)
plt.xlabel('Prediction Error [PRICE]')
_ = plt.ylabel('Count')

with open('../../nn_utilities/scalar_price', 'wb') as f:
        pickle.dump(scaler_y, f)
# model.save('price_prediction.h5')
