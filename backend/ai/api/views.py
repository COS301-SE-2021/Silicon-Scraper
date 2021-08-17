import os
import numpy as np
import logging
import json
import pickle
from tensorflow import keras
from pandas import json_normalize, read_csv
from flask import jsonify, request, Blueprint
from api import create_app
from api.nn_utilities.dataEncoding import encode_data

cwd = os.path.dirname(__file__)

PATH_TO_PRICE_PRED_MODEL = 'trained_models/price_prediction.h5'
PATH_TO_AVAIL_PRED_MODEL = 'trained_models/avail_prediction.h5'
PATH_TO_CPU_MODEL_DATA = os.path.join(cwd, "model_data/cpuModels.csv")
PATH_TO_GPU_MODEL_DATA = os.path.join(cwd, "model_data/gpuModels.csv")

price_model = None
avail_model = None

def prepare_params(params):
    data = json_normalize(params)
    
    csv_path = PATH_TO_CPU_MODEL_DATA if data['type'].item() == 'cpu' else PATH_TO_GPU_MODEL_DATA

    models = read_csv(csv_path)

    data['model'] = data['model'].str.upper()

    data_price, data_avail = encode_data(data['brand'], data['model'], data['availability'], data['price'], data['type'], data['date'])
    
    data_price = np.array(data_price)
    data_avail = np.array(data_avail)

    with open(os.path.join(cwd,'nn_utilities/scalar_avail'), 'rb') as f:
        scalar_y_avail = pickle.load(f)

    with open(os.path.join(cwd,'nn_utilities/scalar_price'), 'rb') as f:
        scalar_y_price = pickle.load(f)
    
    data_price = data_price.reshape(-1,1)
    data_avail = data_avail.reshape(-1,1)
    
    return scalar_y_price.transform(data_price), scalar_y_avail.transform(data_avail), scalar_y_avail, scalar_y_price



logging.basicConfig(filename=os.path.join(cwd,"api_logs/api.log"), level=logging.ERROR, format='{%(asctime)s}, {%(module)s}: %(message)s')

parameters = [
    "brand", "model", "date", "type", "price", "availability"
]

bp = Blueprint('predict', __name__, url_prefix='/predict')

app = create_app()

@bp.route('/price-and-availability', methods = ["GET"])
def price_and_availability():
    app.logger.info("Loading models ....")
    
    avail_model = keras.models.load_model(os.path.join(cwd, PATH_TO_AVAIL_PRED_MODEL))
    price_model = keras.models.load_model(os.path.join(cwd, PATH_TO_PRICE_PRED_MODEL))
    app.logger.info("Models loaded ....")
    
    results = {'success': False}

    params = request.json
    if params == None:
        return {
            'success': False,
            'message': 'missing parameter(s)'
        }, 400
    
    missing_params = [str(x) for x in parameters if x not in params]
    incorrect_params = [str(x) for x in params if x not in parameters]

    if len(incorrect_params) > 0:
        return {
            'success': False,
            'message': f"invalid paramter(s): '{' , '.join(incorrect_params)}'."
        }, 400

    if len(missing_params) == 0:
      
        input_data_price, input_data_avail, scaler_y_avail, scalar_y_price = prepare_params(params)

        input_data_price =  input_data_price.reshape(1,-1)
        input_data_avail = input_data_avail.reshape(1, -1)

        price_preds = price_model(input_data_price) 
        avail_preds = avail_model(input_data_avail) 

        results['predictions'] = {'price': 'price', 'availability': ''}
        results['predictions']['price'] = np.round(scalar_y_price.inverse_transform(price_preds)[0], 2).tolist()[0]
        results['predictions']["availability"] = np.argmax(scaler_y_avail.inverse_transform(avail_preds)).tolist()
            
        results['success'] = True
        return jsonify(results), 200

    else:
        return {
            'success': False,
            'message': f"missing parameter(s): '{' and '.join(missing_params)}'."
        }, 400


if __name__ == '__main__':

    print("Starting web service...")
    app.run(host = '0.0.0.0', debug=True,  port=int(os.environ.get('PORT', 8000)))
        