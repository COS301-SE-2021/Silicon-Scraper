import pandas as pd
import datetime
import math
from sklearn.preprocessing import LabelEncoder

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


def split_date(date):
    year = int(date.str[:4])
    month = int(date.str[4:6])
    day_month = int(date.str[6:8])   
    week = datetime.date(year, month, day_month).isocalendar()[1]
    day_week = datetime.date(year, month, day_month).isocalendar()[2]
    day_year = day_week * week
    quarter = math.ceil(float(month)/3)
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
