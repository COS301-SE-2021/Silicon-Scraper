import pandas as pd
import tensorflow as tf
import keras
import os
import numpy as np
import logging
import json
from keras.models import load_model
from pandas import json_normalize
from sklearn.preprocessing import MinMaxScaler
from flask import jsonify, request
from api import app
from api.nn_utilities.dataEncoding import encode_data


PATH_TO_MODELS = "api/trained_models/"
PRICE_PRED_MODEL_NAME = 'price_prediction.h5'
AVAIL_PRED_MODEL_NAME = 'avail_prediction.h5'
PATH_TO_CPU_MODEL_DATA = "api/model_data/cpuModels.csv"
PATH_TO_GPU_MODEL_DATA = "api/model_data/gpuModels.csv"

price_model = None
avail_model = None

def prepare_params(params):
    data = json_normalize(params)
    
    csv_path = PATH_TO_CPU_MODEL_DATA if data['type'].item() == 'cpu' else PATH_TO_GPU_MODEL_DATA

    models = pd.read_csv(csv_path)

    data['model'] = data['model'].str.upper()

    # for model in models.itertuples():
    #     if data['model'].item() == str(model.model):
    #         data['model'] = model.Index
    #         break

    data_price, data_avail = encode_data(data['brand'], data['model'], data['availability'], data['price'], data['type'], data['date'])
    #print(data_price)
    #needs changing 
    #if pred == 'price' else data[['brand','date','modelID', 'price']]
    data_price = np.array(data_price)
    data_avail = np.array(data_avail)
    scaler_x_price = MinMaxScaler()
    scaler_y_price = MinMaxScaler()
    scaler_y = MinMaxScaler()
    scaler_x = MinMaxScaler()

    scaler_x.fit(data_avail)
    scaler_x_price.fit(data_price)

    data_avail_scale = scaler_x.transform(data_avail)
    data_price_scale = scaler_x_price.transform(data_price)
    return data_price_scale, data_avail_scale 

logging.basicConfig(filename="api/api_logs/api.log", level=logging.ERROR, format='{%(asctime)s}, {%(module)s}: %(message)s')

parameters = [
    "brand", "model", "date", "type", "price", "availability"
]


@app.route('/predict', methods = ["GET"])
def predict():
    #app.logger.info("Endpoint reached")
    print("Loading model...")
    price_model = load_model(os.path.join(PATH_TO_MODELS, PRICE_PRED_MODEL_NAME))
    avail_model = load_model(os.path.join(PATH_TO_MODELS, AVAIL_PRED_MODEL_NAME))
    print("* Model loaded *")
    
    results = {'success': False}

    params = request.json
    if params == None:
        return {
            'success': False,
            'message': 'missing parameter(s)'
        }, 400
    
    missing_params = [str(x) for x in parameters if x not in params]

    if len(missing_params) == 0:
        input_data_price, input_data_avail = prepare_params(params)
    
        price_preds = price_model(input_data_price)
        avail_preds = 'avail_preds'
        #avail_preds = str(avail_model(input_data_avail)))

        #preds = str(scaler_y.inverse_transform(preds)) 
        results['predictions'] = {'price': "", "availability": ''}
        results['predictions']['price'] = price_preds
        results['predictions']["availability"] = avail_preds
            
        results['success'] = True
        return jsonify(results), 200
    else:
        return {
            'success': False,
            'message': f"missing parameter(s): '{' and '.join(missing_params)}'."
        }, 400

    #return jsonify(results)
        
 
if __name__ == '__main__':

    print("Starting web service...")
    app.run(host = '0.0.0.0', debug=True,  port=int(os.environ.get('PORT', 5000)))