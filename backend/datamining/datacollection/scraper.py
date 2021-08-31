import sys

sys.path.append('/webscrapers')
import twitterscraper

search_keys = ["#Nvidia gpu prices",
               "#Amd gpu prices",
               "#sapphire gpu prices",
               "#Intel cpu prices",
               "#Amd cpu prices"]


def twitter():
    twitterframe = twitterscraper.initializetwittercrawler()

    [twitterframe.scrapetwitter(keys, "2020-01-01") for keys in search_keys]

    return twitterframe.gettweets()



