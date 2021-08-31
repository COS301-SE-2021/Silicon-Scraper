from bs4 import BeautifulSoup
from urllib.request import urlopen
import urllib.parse
from requests_html import HTMLSession

session = HTMLSession()

from mechanicalsoup import Browser

browser = Browser()

# implementation can not be tested fully/in a desirable manner
# look for a better way to do this

"""
 Generic object used to  assign dynamic properties
"""


class Article(object):
    pass


"""
    Scraper used to retrieve articles regarding GPUs and CPUs

    getHTML -> returns the html based on the input string url provided

    save_articles -> returns an article array of titles and links to the articles based
    on the response object data provided
"""


class ArticleCrawler:

    def __init__(self, sleep=1, scrolldown=10, first=True):
        self.sleep = sleep
        self.scrolldown = scrolldown
        self.first = first

    def getHTML(self, url):
        response = session.get(url)
        response.html.render(sleep=self.sleep, scrolldown=self.scrolldown)
        articles = response.html.find('article')
        return articles

    def save_articles(self, articles):
        parsed_articles = []
        for article in articles:
            item = Article()
            news_item = article.find('h3', first=self.first)
            if news_item != None:
                item.title = news_item.text
                item.link = news_item.absolute_links
                parsed_articles.append(item)
        return parsed_articles

    def scrape(self, url):
        return self.save_articles(self.getHTML(url))


# Testing

url = "https://news.google.com/search?q=cpu%20prices&hl=en-ZA&gl=ZA&ceid=ZA%3Aen"

aCrawler = ArticleCrawler()
articles = aCrawler.scrape(url)
print(articles)

# crawler = ArticleCrawler()
# articles = crawler.getHTML(url)
# saved_articles = crawler.save_articles(articles)
# print(saved_articles[0].title, saved_articles[0].link)
