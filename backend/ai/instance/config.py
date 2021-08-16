import os 

SECRET_KEY = os.getenv('SECRET_KEY', "default-key")
DEBUG = False
DEVELOPMENT = False