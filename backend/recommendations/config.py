import os
from dotenv import load_dotenv

def config():
    load_dotenv()
    
    db = {
        host = os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PW')
    }

    return db