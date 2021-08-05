import pandas as pd
import tensorflow as tf
import keras
import os
import numpy as np
import logging
from keras.models import load_model
from pandas import json_normalize
from sklearn.preprocessing import MinMaxScaler
from flask import jsonify, request
from ai import app
from ai.nn_utilities.dataEncoding import encode_data


PATH_TO_MODELS = "ai/trained_models/"
PRICE_PRED_MODEL_NAME = 'price_prediction.h5'
AVAIL_PRED_MODEL_NAME = 'avail_prediction.h5'
PATH_TO_CPU_MODEL_DATA = "ai/model_data/cpuModels.csv"
PATH_TO_GPU_MODEL_DATA = "ai/model_data/gpuModels.csv"

price_model = None
avail_model = None

def prepare_params(params, pred):
    data = json_normalize(params)
    
    csv_path = PATH_TO_CPU_MODEL_DATA if data['type'].item() == 'cpu' else PATH_TO_GPU_MODEL_DATA

    models = pd.read_csv(csv_path)

    data['model'] = data['model'].str.upper()
    data['date'] = data['date'].str[:8]
    data['date'] = data['date'].astype(int)
    data['availability'] = (1 if data['availability'].item() == 'In Stock' else 0)

    data['modelID'] = ""
    for model in models.itertuples():
        if data['model'].item() == str(model.model):
            data['modelID'] = model.Index
            break

    #needs changing 
    data = data[['brand','date','modelID', 'availability']] 
    #if pred == 'price' else data[['brand','date','modelID', 'price']]
    use_data = np.array(data)
    scaler_x = MinMaxScaler()
    scaler_x.fit(use_data)
    data_scale = scaler_x.transform(use_data)

    return data_scale  

logging.basicConfig(filename="ai/api_logs/api.log", level=logging.ERROR, format='{%(asctime)s}, {%(module)s}: %(message)s')

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
            params = json_normalize(params)
            input_data_price, input_data_avail = encode_data(params['brand'], params['model'], params['availability'], params['price'], params['type'], params['date']) #prepare_params(params, "price")
        
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
    app.run(debug=True,  port=int(os.environ.get('PORT', 5000)))