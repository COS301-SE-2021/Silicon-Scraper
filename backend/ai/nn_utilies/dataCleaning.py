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
from nn_utilies import train_test_split, dataCleaning

#
#This function cleans the given data, by merging it with the model and getting rid of null rows
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


#
#This function cleans the given data by merging its brand and getting rid of the empty rows
#
def setBrand(data):
    brands = set(data["brand"].str.upper())
    brands = brands
    brands = pd.DataFrame(brands)
    brands = brands.rename(columns={0: "brand"})
    brands

    for brand in brands.itertuples():
        data.loc[data["brand"].str.upper() == brand.brand, "brand"] = brand.Index

    return data

def mergeTypes(gpu_data,cpu_data):
    data = gpu_data.append(cpu_data, ignore_index = True)
    data['type'] = [1 if x == 'gpu' else 0 for x in data['type']]
    return data
