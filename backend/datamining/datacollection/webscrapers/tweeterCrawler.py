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


