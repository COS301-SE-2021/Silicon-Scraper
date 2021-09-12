import sys
import sqlalchemy as db
from decouple import config

sys.path.append('../sentimentAnalysis')
import sentiments

engine = db.create_engine(config['DB_CONNECTION'])
connection = engine.connect()
metadata = db.MetaData()

listofsentiments = sentiments.sentimentanalysis()
query = db.insert('sentiments')
Result = connection.execute(query, listofsentiments)
