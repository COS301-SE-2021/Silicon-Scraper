import requests
from bs4 import BeautifulSoup
import numpy as np
from decouple import config


class ReviewCrawler:

    def __init__(self) -> None:
        pass

    def getreview(self, product):
        URL = config["BASEURL_1"] + product
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")
        results = soup.find("article")
        title = results.find_all(class_="review-title-medium")
        results = results.find(class_="pro-con")
        results = results.find_all("li")
        title = {"title": tit.text.strip() for tit in title}
        reviews = {"reviews": [result.text.strip() for result in results if result.text.strip() != '']}
        review = dict(title, **reviews)
        URL = config["BASEURL_2"] + product
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")
        results = soup.find("article")
        results = results.find(class_="pros-cons-block")
        results = results.find_all("li")
        results = [result.text.strip() for result in results if result.text.strip() != '']
        review['reviews'] = np.append(review['reviews'], results).tolist()
        return review

    def getproduct(self, url):
        temp = url.split("/")
        return temp[len(temp) - 1]

    def title(self):
        res = []
        for i in range(9):
            page = i + 1
            URL = config["BASEURL_3"] + str(page)
            page = requests.get(URL)
            soup = BeautifulSoup(page.content, "html.parser")

            results = soup.find(class_="listing-items")
            results = results.find_all(class_="entry")
            results = [self.getproduct(result['href'].strip()) for result in results if result.text.strip() != '']
            res = np.append(res, results).tolist()

        return res

    def getreviews(self):
        reviews = []
        rev = self.title()
        for r in rev:
            revi = self.getreview(r)

            if revi != {}:
                reviews.append(revi)

        return reviews
