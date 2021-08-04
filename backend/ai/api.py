import pandas as pd
import tensorflow as tf
import keras
import os
import numpy as np
import logging
import time 
from keras.models import load_model
from pandas import json_normalize
from sklearn.preprocessing import MinMaxScaler
from flask import Flask, jsonify, request

# TODO: make api scalable
# WARN: don't try to run, will not work

PATH_TO_MODELS = "trained_models/"
PRICE_PRED_MODEL_NAME = 'ai_model.h5'
AVAIL_PRED_MODEL_NAME = 'avail_prediction.h5'
PATH_TO_CPU_MODEL_DATA = "model_data/cpuModels.csv"
PATH_TO_GPU_MODEL_DATA = "model_data/models.csv"

price_model = None
avail_model = None

def prepare_params(params, pred):
    data = json_normalize(params)
    
    csv_path = PATH_TO_CPU_MODEL_DATA if data['type'].item() == 'cpu' else PATH_TO_GPU_MODEL_DATA

    models = pd.read_csv(csv_path)

    # whole  functions needs amending to work with both availability and price 
    #data = data.drop('type')
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

    

logging.basicConfig(filename="api_logs/api.log", level=logging.ERROR, format='{%(asctime)s}, {%(module)s}: %(message)s')


app = Flask(__name__)

@app.route('/predict', methods = ["POST"])
def predict():
    #app.logger.info("Endpoint reached")
    print("Loading model...")
    price_model = load_model(os.path.join(PATH_TO_MODELS, PRICE_PRED_MODEL_NAME))
    avail_model = load_model(os.path.join(PATH_TO_MODELS, AVAIL_PRED_MODEL_NAME))
    print("* Model loaded *")

    results = {'status': failure}

    if request.method == "POST":
        params = request.json
        if params == None:
            params = request.args
        
        if params != None:
            input_data_price = prepare_params(params, "price")
            input_data_avail = prepare_params(params, "availability")

            print("Start predcition ....")
            price_preds = str(price_model(input_data_price))
            avail_preds = 'avail_preds'
            #avail_preds = str(avail_model(input_data_avail)))

            #preds = str(scaler_y.inverse_transform(preds)) 
            results['predictions'] = {'price': "", "availability": ''}
            results['predictions']['price'] = price_preds
            results['predictions']["availability"] = avail_preds
            print("Returned prediction ....")
                
            results['status'] = 'success'

    return jsonify(results)
        
 
if __name__ == '__main__':

    print("Starting web service...")
    app.run(host = '0.0.0.0', debug=True)