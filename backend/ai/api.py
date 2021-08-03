from flask import Flask, jsonify, request
import pandas as pd
import tensorflow as tf
import keras
from keras.models import load_model
import os
import numpy as np
from pandas import json_normalize
import logging
from threading import Thread 
import time 
from sklearn.preprocessing import MinMaxScaler

PATH_TO_MODELS = "trained_models/"
PRICE_PRED_MODEL_NAME = 'price_prediction.h5'
AVAIL_PRED_MODEL_NAME = 'avail_prediction.h5'
PATH_TO_CPU_MODEL_DATA = "model_data/cpuModels.csv"
PATH_TO_GPU_MODEL_DATA = "model_data/models.csv"

price_model = None
avail_model = None

def prepare_params(params):
    data = json_normalize(params)
    
    csv_path = PATH_TO_CPU_MODEL_DATA if data['type'] === cpu else PATH_TO_GPU_MODEL_DATA

    models = pd.read_csv(csv_path)
    data = data.drop('type')
    data['model'] = data['model'].str.upper()
    data['date'] = data['date'].str[:8]
    data['date'] = data['date'].astype(int)
    data['availability'] = (1 if data['availability'].item() == 'In Stock' else 0)

    data['modelID'] = ""
    for model in models.itertuples():
        if data['model'].item() == str(model.model):
            data['modelID'] = model.Index
            break

    data = data[['brand','date','modelID', 'availability']]
    use_data = np.array(data)
    scaler_x = MinMaxScaler()
    scaler_x.fit(use_data)
    data_scale = scaler_x.transform(use_data)

    return data_scale

    

# logging.basicConfig(filename="api_logs/api.log", 
# level=logging.DEBUG,
# format='{%(asctime)s}, {%(module)s}: %(message)s')


app = Flask(__name__)

@app.route('/predict', methods = ["POST"])
def predict():
    #app.logger.info("Endpoint reached")
    print("Loading model...")
    price_model = load_model(os.path.join(PATH_TO_MODELS, PRICE_PRED_MODEL_NAME))
    avail_model = load_model(os.path.join(PATH_TO_MODELS, AVAIL_PRED_MODEL_NAME))
    print("* Model loaded *")

    results = {'success': False}

    if request.method == "POST":
        params = request.json
        if params == None:
            params = request.args
        
        if params != None:
            input_data = prepare_params(params)
            print("Start predcition ....")
            price_preds = str(model(input_data))
            avail_preds = str(model(params))
            #preds = str(scaler_y.inverse_transform(preds)) 
            results['predictions']['price'] = price_preds
            results['predictiona']["availability"] = avail_preds
            print("Returned prediction ....")
                
            results['success'] = True

    return jsonify(results)
        
 
if __name__ == '__main__':

    print("Starting web service...")
    app.run(host = '0.0.0.0', debug=True)