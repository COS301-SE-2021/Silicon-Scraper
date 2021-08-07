import pandas as pd
import sklearn.preprocessing as sp
from ai.nn_utilities.dataCleaning import split_date

def getModelData():
    gpuModels = pd.read_csv("ai/model_data/gpuModels.csv")
    cpuModels = pd.read_csv("ai/model_data/cpuModels.csv")
    brands = pd.read_csv("ai/model_data/brands.csv")


    models = gpuModels.append(cpuModels)
    models = models.drop(columns=['id'])
    label_encoder = sp.LabelEncoder()
    models['model_code'] = label_encoder.fit_transform(models['model'])
    enc_models= pd.get_dummies(models.model_code, prefix='model')
    models = pd.concat([models, enc_models], axis=1)

    brands = brands.drop(columns=['id'])
    label_encoder = sp.LabelEncoder()
    brands['brand_code'] = label_encoder.fit_transform(brands['brand'])
    enc_brands = pd.get_dummies(brands.brand_code, prefix='brand')
    brands = pd.concat([brands, enc_brands], axis=1)
   
    availability = pd.DataFrame(["Out of stock", "In stock"])
    availability = availability.rename(columns={0: "availability"})
    availability['availability_code'] = label_encoder.fit_transform(availability['availability'])
    enc_availability = pd.get_dummies(availability.availability_code, prefix='a')
    availability = pd.concat([availability, enc_availability], axis=1)

    type_ = pd.DataFrame(["cpu", "gpu"])
    type_ = type_.rename(columns={0: "type"})
    type_['type_code'] = label_encoder.fit_transform(type_['type'])
    enc_type = pd.get_dummies(type_.type_code, prefix='type')
    type_ = pd.concat([type_, enc_type], axis=1)

    return models, brands, availability, type_

def getCode(data, code_pd, name):
    for dt in code_pd.itertuples():
        if data.str.upper().item() == str(dt[1]):
            return code_pd[code_pd[name] == str(dt[1])]

#
# This function takes in a json product data and encodes it for price and availability prediction
#
def encode_data(brand, model, availability_, price, type_d, timestamp):
    models, brands, availability, type_ = getModelData()
    year, month, quarter, week, day_year, day_month, day_week = split_date(timestamp)

    d1 = getCode(model, models, "model").drop(columns=["model", "model_code"])
    d2 = getCode(brand, brands, "brand").drop(columns=["brand", "brand_code"])
    d3 = type_.loc[type_["type"].isin( type_d)].drop(columns=["type", "type_code"])
    d4 = availability.loc[availability["availability"].str.upper().isin(availability_.str.upper())].drop(columns=["availability", 'availability_code'])

    data_ = pd.DataFrame([{"price": price}])

    d1.reset_index(drop=True, inplace=True)
    d2.reset_index(drop=True, inplace=True)
    d3.reset_index(drop=True, inplace=True)
    d4.reset_index(drop=True, inplace=True)

    data_2 = pd.concat([data_, d1, d2, d3], axis=1)
    data_ = pd.concat([data_, d1, d2, d3, d4], axis=1)
    data_1 = data_.drop(columns=["price"])

    data_1['year'] =  data_2['year'] = year
    data_1['month'] = data_2['month'] = month
    data_1['quarter'] = data_2['quarter'] = quarter
    data_1['week'] =  data_2['week'] = week
    data_1['day_year'] = data_2['day_year'] = day_year
    data_1['day_month'] = data_2['day_month'] = day_month
    data_1['day_week'] = data_2['day_week'] = day_week

    return data_1, data_2
