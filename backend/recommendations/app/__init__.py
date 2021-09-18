import os
from recommendations.instance import config
from flask import Flask

config = config.Config()
db = config.connect()

def create_app(test_config = None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = 'dev'
    )
    
    if test_config is None:
        app.config.from_object(config)
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app
