import sys
import sqlalchemy as db
from decouple import config
from sentiment import sentiment

sys.path.append('..')
from sent.datacollection.webscrapers.reviewCrawler import ReviewCrawler

db_con = config('DB_CONNECTION')

def formatTitle(title: str) -> tuple:
    brand = title.split(" ")[0]
    i1 = title.find(" ")
    i2 = [title.find("review") if title.find("review") != -1 else title.find("Review")]
    model = title[i1+1:i2]
    return brand, model


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

reviewCrawler = ReviewCrawler()
reviews = reviewCrawler.getreviews()
print(reviews)

sentiments = []

for review in reviews:
    data = {
        "brand": review["brand"],
        "model": review["model"]
    }
    data["characteristics"] = sentiment(review["reviews"])
    sentiments.append(data)

ss = sentimentStorage(db_con)
ss.insertSentiments(sentiments)