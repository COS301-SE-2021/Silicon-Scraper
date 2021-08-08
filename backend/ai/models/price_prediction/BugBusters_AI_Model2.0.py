import keras as keras
import numpy as np
import pandas as pd

import sklearn.model_selection as sk
import sklearn.preprocessing as sp
from keras import layers
from matplotlib import pyplot as plt

from backend.ai.nn_utilies.dataEncoding import encode_data

cpu_data = pd.read_csv("cpuProductData.csv")
gpu_data = pd.read_csv("gpuProductData.csv")

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

# model.save('price_prediction.h5')
