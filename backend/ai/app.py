from flask import Flask, jsonify, request
import pandas as pd
import tensorflow as tf
import keras
from keras.models import load_model
import os
import numpy as np

def prepare_params(params):
    data = json_normalize(params)
    models = pd.read_csv("models.csv")
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
    

PATH_TO_MODELS = "trained_models/"
global graph
#graph = tf.compat.v1.get_default_graph()
model = load_model(os.path.join(PATH_TO_MODELS,'ai_model.h5'))

app = Flask(__name__)

@app.route('/predict', methods = ["POST"])
def predict():
    results = {'success': False}
    
    params = request.json
    if params == None:
        params = request.args
    
    if params != None:
        inp = pd.DataFrame()
        # with graph.as_default():
        results['prediction'] = {"price": str(model.predict(params))}
        #data['prediction'] = {"availability": str(model.predict(params))}
        results['success'] = True 
        
    return jsonify(data)

if __name__ == '__main__':
    print("Starting web service...")
    app.run(host = '0.0.0.0', debug=True)