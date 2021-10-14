from logging import disable
from typing import List
from nltk.stem.porter import PorterStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from numpy import number
import spacy
from nltk import word_tokenize, pos_tag
from nltk.corpus import wordnet as wn
from textblob.blob import TextBlob

nlp = spacy.load('en_core_web_sm')

def findNouns(sentence: str) -> List[str]:
    nouns = []
    word_list = word_tokenize(sentence)
    tag_list = pos_tag(word_list)
    for tags in tag_list:
        if (tags[1] == 'NN' or tags[1] == 'NNS'
        or tags[1] == 'NNPS'):
            nouns.append(tags[0])
    return nouns

def extract(sentences: List[str]) -> List[dict]:
    aspects = []
    for sentence in sentences:
        nouns = findNouns(sentence)
        doc = nlp(sentence)
        for noun in nouns:
            for token in doc:
                if noun == token.text:  
                    if token.pos_ != 'ADJ':
                        prepend = ''
                        for child in token.children:
                            if child.pos_ == 'ADJ':
                                prepend += child.text + ' '
                        dic = dict()
                        if noun not in dic:
                            dic[noun] = []
                        dic[noun].append(prepend.strip())
                        aspects.append(dic)
    return aspects

match_categories = {
    "power": ["power", "strong"],
    "price": ["price"],
    "temperature": ["temperature"],
    "performance": ["performance", "behaviour", "functionality"],
    "design": ["design", "weight", "appearance", "size"],
    "noise": ["noise"]
}

def match_cat(aspect: str):
    aspect = WordNetLemmatizer().lemmatize(aspect)
    try:
        wn_term = wn.synsets(aspect)[0]
    except:
        try:
            aspect = PorterStemmer().stem(aspect)
            wn_term = wn.synsets(aspect)[0]

        except:
            return None

    max_score = -100
    max_cat = ''
    for term, term_list in match_categories.items():
        for word in term_list:
            word = wn.synsets(word)[0]
            score = wn_term.wup_similarity(word)
            if score > max_score:
                max_score = score
                max_cat = term
    if max_score >= 0.5:
        return max_cat
    else:
        return None

def sentiment(sentences: List[str]) -> List[dict]:
    aspect_terms: list[dict] = extract(sentences)
    aspect_cat_sents = {
        'price': [],
        'design': [],
        'temperature': [],
        'noise': [],
        'performance': [],
        'power': []
    }

    for aspects in aspect_terms:
        for term, desc in aspects.items():
            if desc == []:
                continue
            for desc in desc:
                sentiment_value = TextBlob(desc).sentiment.polarity
                category = match_cat(term)
                if category == None:
                    continue
                aspect_cat_sents[category].append(sentiment_value)
    data = []
    for category, scores in aspect_cat_sents.items():
        if scores != []:
            total_scores = sum(scores)
            scores_length = len(scores) 
            polarity = 'positive'
            if total_scores < 0:
                polarity = 'negative'
            data.append({'type': category, 'polarity': polarity, 'value': abs(total_scores*100)/scores_length})
    return data