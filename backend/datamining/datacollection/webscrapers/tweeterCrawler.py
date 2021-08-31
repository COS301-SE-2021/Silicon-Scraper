import tweepy as tweepy
from decouple import config
import pandas as pd


class Twitter(object):
    pass


class TwitterCrawler:

    def __init__(self, api_key, secret):
        self.api_key = api_key
        self.secret = secret
        self.auth = tweepy.AppAuthHandler(api_key, secret)
        self.api = tweepy.API(self.auth, wait_on_rate_limit=True)
        self.tweets = pd.DataFrame(columns=['Tweets'])

    def scrapetwitter(self, search_term, since_date):
        tweets = tweepy.Cursor(self.api.search, q=search_term, lang='en', since=since_date,
                               tweet_mode='extended').items(2000)
        tweets = [x.full_text for x in tweets]
        self.tweets = self.tweets.append(pd.DataFrame(tweets, columns=['Tweets']), ignore_index=True)

    def gettweets(self):
        return self.tweets
