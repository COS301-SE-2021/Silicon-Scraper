import numpy as np
import sklearn.preprocessing as sp

#
# This function takes in the training and test data and normalizes it using the minMax scaler
#
def normalize(training_x, training_y, test_x, test_y):
    train_labels = np.array(training_y)
    test_labels = np.array(test_y)

    y_train = np.reshape(train_labels, (-1,1))
    y_val = np.reshape(test_labels, (-1,1))
    scaler_x = sp.MinMaxScaler()
    scaler_y = sp.MinMaxScaler()
    xtrain_scale = scaler_x.transform(training_x)
    xval_scale = scaler_x.transform(test_x)
    ytrain_scale =scaler_y.transform(y_train)
    yval_scale = scaler_y.transform(y_val)

    return xtrain_scale, xval_scale, ytrain_scale, yval_scale, scaler_x, scaler_y