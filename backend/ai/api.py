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
model = None
preds = None
input_data = None

def prepare_params(params):
    data = json_normalize(params)
    models = pd.read_csv("model_data/models.csv")
    data['model'] = data['model'].str.upper()
    data['date'] = data['date'].str[:8]
    data['date'] = data['date'].astype(int)
    data['availability'] = (1 if data['availability'].item() == 'In Stock' else 0)

    data['modelID'] = ""
    for model in models.itertuples():
        if data['model'].item() == str(model.model):
            data['modelID'] = model.Index
            #data.at[data.Index,'modelID'] = model.Index
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
    model = load_model(os.path.join(PATH_TO_MODELS,'ai_model.h5'))
    print("* Model loaded *")

    results = {'success': False}

    params = request.json
    if params == None:
        params = request.args
    
    if params != None:
        input_data = prepare_params(params)
        # with graph.as_default():
        print("Start predcition ....")
        preds = str(model(input_data))
        #preds = str(scaler_y.inverse_transform(preds)) 
        results['predictions'] = {"price": preds}
        #data['prediction'] = {"availability": str(model.predict(params))}
        print("Returned prediction ....")
            
        print("Prediction made successfully")
        results['success'] = True

    return jsonify(results)
        
 
if __name__ == '__main__':
    # print("Starting model service...")
    # t = Thread(target=prediction_process, args=())
    # t.daemon = True
    # t.start()

    print("Starting web service...")
    app.run(host = '0.0.0.0', debug=True)