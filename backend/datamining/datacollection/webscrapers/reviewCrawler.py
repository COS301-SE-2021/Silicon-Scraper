import requests
from bs4 import BeautifulSoup

class ReviewCrawler:

    def __init__(self) -> None:
        pass

    def getHTML(self, url):
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")
        html = soup.find(id="list")
        html = html.find_all(class_="clearfix")
        return html

    def save(self, html):
        reviews = [{"title": item.find_next(class_="title").text, "review": item.find_next(class_="teaser").text} for item in html]
        return reviews

    def clean(self, review):
        for condition in (("\r", ""), ("\n", ""), ("\t", "")):
            review["title"] = review["title"].replace(*condition)
            review["review"] = review["review"].replace(*condition)
        return review

    def scrape(self, url):
        reviews = self.save(self.getHTML(url))
        for i in range(len(reviews)):
            reviews[i] = self.clean(reviews[i])
        return reviews

URL = "https://www.techpowerup.com/review/?category=Graphics+Cards&manufacturer=&pp=25&order=date"
rCrawler = ReviewCrawler()
reviews = rCrawler.scrape(URL)
print(reviews)