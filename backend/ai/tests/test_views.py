import pytest
import numpy as np
from api import create_app
from api.views import price_model
from flask import json

@pytest.fixture
def client():
    app = create_app({'TESTING': True})
    return app.test_client()

def model_mock(data):
    pass

def test_api_returns_error_on_incorrect_parameters(client):
    res = client.get('/predict/price-and-availability', json={"brand": "MSI",
    "model": "GEFORCE GTX 1080 TI GAMING X OC",
    "availability": "Out of Stock"})

    assert res.status_code == 400
    data = json.loads(res.get_data(as_text=True))
    assert data['success'] == False
    assert "missing" in data['message']

def test_api_returns_error_on_missing_paramaters(client):
    res = client.get('/predict/price-and-availability', json={"brand": "MSI",
    "model": "GEFORCE GTX 1080 TI GAMING X OC",
    "availability": "Out of Stock",
    "da": "20180325112546",
    "type": "gpu",
    "price": 15799})

    assert res.status_code == 400
    data = json.loads(res.get_data(as_text=True))
    assert data['success'] == False
    assert "invalid" in data['message']

