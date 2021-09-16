import pandas as pd 
import json
import re
import psycopg2
import nltk
import nan 
from nltk.corpus import stopwords
from configparser import ConfigParser
from sklearn.feature_extraction.text import TfidfVectorizer

stopwords = set(stopwords.words('english'))

#This function facilitates the connection to the database
def connect():
    try:
        
        parser = ConfigParser()
        parser.read('database.ini')

        #params = config()
        host = parser.get('postgresql','DB_HOST')
        port = parser.get('postgresql','DB_PORT')
        database =parser.get('postgresql','DB_NAME')
        user = parser.get('postgresql','DB_USER')
        password = parser.get('postgresql','DB_PW')

        #params = config()
        #print(host, port, password, user, database)
        conn = psycopg2.connect(host=host, port=port, database=database, user=user, password=password)

        curr = conn.cursor()
        
#         query = """SELECT table_name from information_schema.tables WHERE table_schema = 'public'"""
#         curr.execute(query)
        
#         rows = curr.fetchall()

#         for row in rows:
#             print(row[0])

        return curr, conn
    except( Exception, psycopg2.DatabaseError) as err:
        print(err)
    

#A function that gets the user table and returns it as a dataframe
def get_users(curr, conn):
    query = "SELECT id FROM users"
    table = pd.read_sql_query(query, conn)
    table = pd.DataFrame(table)
    return table


def get_wishlist(cur, con):
    query = "SELECT * FROM wishilist_cpu"
    cpus = pd.read_sql_query(query, con)
    cpus = pd.DataFrame(cpus)
    
    query = "SELECT * FROM wishilist_gpu"
    gpus = pd.read_sql_query(query, con)
    
    table = cpus.append(gpus)
    #any preprocessing needing to be done
    #table = remove_columns_from_products(table)
    return table 


def get_all_products(cur, con):
    query = "SELECT id, brand, type, description FROM cpus"
    cpus = pd.read_sql_query(query, con)
    cpus = pd.DataFrame(cpus)
    
    query = "SELECT id, brand, type, description FROM gpu"
    gpus = pd.read_sql_query(query, con)
    
    table = cpus.append(gpus)
    
    # any preprocessing needed to be done
    table = remove_columns_from_products(table)
    return table


def recommend(idx, cosine = similarity):
    
    #find the index of the product in the index series
    item = rec[rec == idx].index[0]
    
    #get array of similarities and sort them in descending order
    similarities = list(enumerate(cosine[item]))
    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)
    
    #get the top 5 products, excluding the product itself
    similarities = similarities[1:6]
    
    #get index of top 5 
    index = [i[0] for i in similarities]
    
    #get the products using the the retrieved index
    return all_products.iloc[index]


#A function that turns the object description into a string 
#and checks for empty descriptions
def clean_data(text):
    if text == '' or not list(text):
        return math.nan
    final = [(x +"-" + y).lower() for x,y in zip(list(text), list(text.values()))]
    return "  ".join(final)

def similarity_func():
    pass

def main():

    cur, con = connect()
    #get all products in db and all wishlist products
    wishlist_products = get_wishlist(cur, con)
    wishlist_products.drop_duplicates(subset='product_id', keep=False, inplace=True)
    all_products = get_all_products(cur, con)

    #clean products dataframe 
    all_products.dropna(inplace=True)
    all_products['descriptions_cl'] = all_products['descriptions'].apply(clean_data)
    all_products.drop(['description'], axis=1, inplace=True)
    all_products.dropna(inplace=True)

    #vectorize products and calculate similarity 
    all_products.set_index('id', inplace=True)
    all_products['all_features'] = all_products['brand'] +" "+ all_products['retailer'] +" "+ all_products['description_cl']
    vectorizor = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0)
    tfidf_matrix = vectorizor.fit_transform(all_products['all_features'])
    similarity = linear_kernel(tfidf_matrix, tfidf_matrix)

    rec = pd.Series(all_products.index)

    #get recommendations for all products in wishlist 
    result = pd.DataFrame()
    result.set_index(wishlist_products['product_id'])
    recs = []
    for product in wishlist_products['product_id']:
        recs.push(recommend(product))
        
    result['recommendation'] = recs
    #add result to db

    con.close()