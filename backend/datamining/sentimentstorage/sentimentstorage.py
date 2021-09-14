import sys
import sqlalchemy as db
import psycopg2
from decouple import config

sys.path.append('../sentimentAnalysis')
import sentiments

db_con = config('DB_CONNECTION')


class sentimentStorage:

    def __init__(self, connectionPool) -> None:
        self.engine = db.create_engine(connectionPool)
        self.connection = self.engine.connect()
        self.metadata = db.MetaData()

    def insertSentiments(self, sentiments):
        listofsentiments = sentiments.sentimentanalysis()
        query = db.insert('sentiments')
        Result = self.connection.execute(query, listofsentiments)
        return Result


ss = sentimentStorage(db_con)
ss.insertSentiments(sentiments)
