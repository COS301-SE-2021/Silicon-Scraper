import os
from dotenv import load_dotenv

def config():
    load_dotenv()

    db['host'] = os.getenv('DB_HOST')
    db['database'] = os.getenv('DB_NAME')
    db['user'] = os.getenv('DB_USER')
    db['password'] = os.getenv('DB_PW')

    return db