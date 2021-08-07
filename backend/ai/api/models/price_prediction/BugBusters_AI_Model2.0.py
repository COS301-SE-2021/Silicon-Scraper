#!/usr/bin/env python
# coding: utf-8

# In[625]:


import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import datetime
import math

from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.layers.experimental import preprocessing
from sklearn.preprocessing import MinMaxScaler

# In[626]:


cpu_data = pd.read_csv("cpuProductData.csv")
gpu_data = pd.read_csv("gpuProductData.csv")
gpuModels = pd.read_csv("gpuModels.csv")
cpuModels = pd.read_csv("cpuModels.csv")

# In[627]:


#gpuModels

# In[628]:


#cpuModels

# In[629]:


cpu_data['model'] = cpu_data['model'].str.upper()
cpuModels['model'] = cpuModels['model'].str.upper()
cleanData(cpu_data, cpuModels)
cpu_data

# In[630]:


cpu_data[cpu_data['modelID'].isnull() == True]

# In[631]:


gpu_data['model'] = gpu_data['model'].str.upper()
gpuModels['model'] = gpuModels['model'].str.upper()
cleanData(gpu_data, gpuModels)
gpu_data

# In[632]:


gpu_data[gpu_data['modelID'].isnull() == True]

# In[633]:


data = gpu_data.append(cpu_data, ignore_index = True)
data['model'] = data['model'].str.upper()
data['date'] = data['date'].astype(str).str.extract(r'^(\d{8})', expand=False)
data['date'] = data['date'].astype(int)
data

# In[ ]:




# In[634]:


def cleanData(data, models):
    data['availability'] = [1 if x == 'In Stock' else 0 for x in data['availability']]
    
    for dt in data.itertuples():
        for model in models.itertuples():
            if dt.model.find(str(model.model)) != -1:
                data.at[dt.Index,'modelID'] = model.Index
                continue

    data.head()

# In[635]:


data['type'] = [1 if x == 'gpu' else 0 for x in data['type']]

# In[636]:


data

# In[637]:


    brands = set(data["brand"].str.upper())
    brands = brands
    brands = pd.DataFrame(brands)
    brands = brands.rename(columns={0: "brand"})
    brands

    for brand in brands.itertuples():
        data.loc[data["brand"].str.upper() == brand.brand, "brand"] = brand.Index

# In[638]:


data

# In[642]:


# data[data["modelID"] == 4]

# In[548]:


# data.loc[data["type"] == 0, ['modelID']] += 44
data[data["type"] == 0]

# In[549]:


data

# In[550]:


model_one_hot_encoding = pd.get_dummies(data["modelID"], prefix="model", prefix_sep='.')
data_2 = data
data_2 = pd.concat([data, model_one_hot_encoding], axis=1)
data_2

# In[551]:


model_one_hot_encoding = pd.get_dummies(data["brand"], prefix="brand", prefix_sep='.')
data_2 = pd.concat([data_2, model_one_hot_encoding], axis=1)
data_2

# In[552]:


model_one_hot_encoding = pd.get_dummies(data["type"], prefix="type", prefix_sep='.')
data_2 = pd.concat([data_2, model_one_hot_encoding], axis=1)
data_2

# In[553]:


model_one_hot_encoding = pd.get_dummies(data["availability"], prefix="availability", prefix_sep='.')
data_2 = pd.concat([data_2, model_one_hot_encoding], axis=1)
data_2

# In[554]:


data = data_2

# In[555]:


data_a = data.drop(columns = ['brand', 'model','modelID', 'availability', 'type' ])
data_a

# In[556]:


data = data_a

# In[557]:


data

# In[558]:


data['year'] = ''
data['month'] = ''
data['quarter']= ''
data['week']= ''
data['day_year']= ''
data['day_month']= ''
data['day_week']= ''

# In[559]:


data

# In[560]:


data.date

# In[561]:


def split_date(date):
    year = int(date[:4])
    month = int(date[4:6])
    day_month = int(date[6:8])
    week = datetime.date(year, month, day_month).isocalendar()[1]
    day_week = datetime.date(year, month, day_month).isocalendar()[2]
    day_year = day_week * week
    quarter = math.ceil(float(month)/3)
    return year, month, quarter, week, day_year, day_month, day_week

# In[562]:


# year, month, quarter, week, day_year, day_month, day_week = split_date(str(data.date))

# In[563]:


for dt in data.itertuples():
    year, month, quarter, week, day_year, day_month, day_week = split_date(str(dt.date))
    data.at[dt.Index, 'year'] = year
    data.at[dt.Index, 'month'] = month
    data.at[dt.Index, 'quarter'] = quarter
    data.at[dt.Index, 'week'] = week
    data.at[dt.Index, 'day_year'] = day_year
    data.at[dt.Index, 'day_month'] = day_month
    data.at[dt.Index, 'day_week'] = day_week

# In[564]:


data = data.drop(columns = ['date'])
data

# In[566]:


train_dataset = data.sample(frac=0.8, random_state=1)
test_dataset = data.drop(train_dataset.index)


train_features = train_dataset.copy()
test_features = test_dataset.copy()


train_labels = train_features.pop('price')
test_labels = test_features.pop('price')

# In[567]:


train_dataset.head()

# In[568]:


train_labels.head()

# In[569]:


input_data = np.array(train_features)
output_label = np.array(train_labels)

test_data = np.array(test_features)
test_output = np.array(test_labels)

print(output_label.shape)
print(test_output.shape)

# In[570]:


output_label.shape

# In[571]:


train_labels=np.array(train_labels)
test_labels=np.array(test_labels)

y_train=np.reshape(train_labels, (-1,1))
y_val=np.reshape(test_labels, (-1,1))
scaler_x = MinMaxScaler()
scaler_y = MinMaxScaler()

print(scaler_x.fit(input_data))
xtrain_scale=scaler_x.transform(input_data)

print(scaler_x.fit(test_data))
xval_scale=scaler_x.transform(test_data)

print(scaler_y.fit(y_train))
ytrain_scale=scaler_y.transform(y_train)

print(scaler_y.fit(y_val))
yval_scale=scaler_y.transform(y_val)

# In[578]:




# In[579]:


model = keras.Sequential([
      layers.Dense(len(xtrain_scale[0]) + 1, input_dim=len(xtrain_scale[0]), kernel_initializer='normal', activation='relu'),
      layers.Dense(399, activation='relu'),
      layers.Dense(399, activation='relu'),
      layers.Dense(1,  activation='relu')
])

model.summary()

# In[588]:


model.compile(loss='mse', optimizer='adam', metrics=['mse','mae', 'accuracy'])
history=model.fit(xtrain_scale, ytrain_scale, epochs=1000, batch_size=150, verbose=0, validation_split=0.2)

# In[589]:


hist = pd.DataFrame(history.history)
hist['epoch'] = history.epoch
hist.tail()

# ## Prediction on the testset

# In[590]:


predictions = model.predict(xval_scale)
predictions = scaler_y.inverse_transform(predictions)
print(predictions)

# 

# In[596]:


metrics = model.evaluate(xval_scale, yval_scale)

# In[598]:


metrics

# # Error loss

# In[583]:


def plot_loss(history):
  plt.plot(history.history['loss'], label='loss')
  plt.plot(history.history['val_loss'], label='val_loss')
  plt.xlabel('Epoch')
  plt.ylabel('Error [PRICE]')
  plt.legend()
  plt.grid(True)

# In[584]:


plot_loss(history)

# In[622]:


test = xval_scale[50].reshape(1,157)
label = yval_scale[50].reshape(-1,1)


test = scaler_x.transform([[0,0,0,0,    0,    0,    0,    0,   0,    0,    0,    0 ,   1 ,   0,
     0    ,0 ,   0  ,  0   , 0   , 0,    0    ,0 ,   0  ,  0 ,   0   , 0   , 0  ,  0,
     0 ,   0 ,   0 ,   0 ,   0   ,0 ,   0,    0 ,   0   , 0 ,   0 ,   0 ,   0,    0,
     0 ,   0 ,   0 ,   0  ,  0 ,   0 ,   0 ,   0  ,  0 ,   0 ,   0 ,   0,    0 ,   0,
     0 ,   0 ,   0 ,   0  ,  0 ,   0 ,   0 ,   0 ,   0  ,  0  ,  0 ,   0 ,   0 ,   0,
     0   , 0  ,  0 ,   0  ,  0  ,  0   , 0   , 0 ,   0  ,  0 ,   0 ,   0 ,   0   , 0,
     0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0   , 0  ,  0   , 0 ,   0 ,   0 ,   0 ,   0,
     0   , 0   , 0  ,  0   , 0 ,   0  ,  0  ,  0 ,   0  ,  0 ,   0 ,   0  ,  0  ,  0,
     0  ,  0  ,  0  ,  0  ,  0  ,  0 ,   0   , 0  ,  0  ,  0 ,   0 ,   0  ,  0  ,  0,
     0  ,  0 ,   0 ,   0  ,  0 ,   0  ,  1  ,  0 ,   0  ,  0  ,  0  ,  0  ,  0  ,  0,
     0   , 0  ,  0   , 0   , 0  ,  0   , 0  ,  1  ,  0 ,   1 ,2018 ,   2 ,   1 ,  12,
    84  , 25   , 6]]).reshape(1,157)


test_predictions = model.predict(test)
test_predictions = scaler_y.inverse_transform(test_predictions)
print("Prediction",test_predictions)

# # Scatterplot show casting the model perfomance on the testSet

# In[585]:


a = plt.axes(aspect='equal')
plt.scatter(test_labels, predictions)
plt.xlabel('True Values [PRICE]')
plt.ylabel('Predictions [PRICE]')
plt.plot()

# In[ ]:




# In[586]:


error = predictions - test_labels
plt.hist(error, bins=25)
plt.xlabel('Prediction Error [PRICE]')
_ = plt.ylabel('Count')

# In[ ]:



