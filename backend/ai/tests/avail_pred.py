import pytest
import sys
import pandas as pd
sys.path.insert(1, '../models')
from api.models.avail_prediction.NN_Avail_Pred_Model import clean_data, encode_data


def test_clean_data():
    df_prod = pd.read_csv('../mocks/cpuProductDataMock.csv')
    df_prod_before = df_prod.copy()
    clean_data(df_prod, '../mocks/cpuModelsMock.csv')
    assert df_prod.equals(df_prod_before) == False

def test_encode_data():
    df_prod = pd.read_csv('../mocks/cpuProductDataMockClean.csv')
    df_prod_before = df_prod.copy()
    df_prod = encode_data(df_prod)
    assert df_prod.equals(df_prod_before) == False
    assert len(df_prod.columns) > len(df_prod_before.columns)

    valid = True
    dtypes = df_prod.dtypes.to_dict()
    for col_name,typ in dtypes.items():
        if (typ == 'str'):
            valid = False
            break
    assert valid == True
    