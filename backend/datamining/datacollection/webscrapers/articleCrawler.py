from bs4 import BeautifulSoup
from urllib.request import urlopen
import urllib.parse

from requests_html import HTMLSession

session = HTMLSession()

import mechanicalsoup

browser = mechanicalsoup.Browser()


def gethtml(url):
    r = session.get(url)
    r.html.render(sleep=1, scrolldown=5)
    articles = r.html.find('article')
    return articles


def parseArticles(articles):
    for item in articles:
        newsitem = item.find('h3', first=True)
        title = newsitem.text
        link = newsitem.absolute_links
        print(title, link)


url = "https://news.google.com/search?q=gpu%20prices&hl=en-ZA&gl=ZA&ceid=ZA%3Aen"
articles = gethtml(url)
parseArticles(articles)
