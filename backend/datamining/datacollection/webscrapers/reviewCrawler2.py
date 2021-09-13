import requests
from bs4 import BeautifulSoup
import numpy as np
from decouple import config


class ReviewCrawler:

    def __init__(self) -> None:
        pass

    def getreview(self, product) -> {}:
        URL = config["BASEURL_1"] + product
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")


