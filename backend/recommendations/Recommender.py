import pandas as pd 
import json
import re
import psycopg2
import nltk
import nan 
import psycopg2.extensions
from nltk.corpus import stopwords
from configparser import ConfigParser
from sklearn.feature_extraction.text import TfidfVectorizer
from config import connect

stopwords = set(stopwords.words('english'))
all_products = None
rec = None
similarity = None

cur, con = connect()
all_products = get_all_products(cur, con)


def update_gpu(gpu_recs):
    new_products = []
    try:

        for i, row in gpu_recs.iterrow():
            query = ("""SELECT id FROM recommendation_gpu WHERE id = %s""")
            cur.execute(query, (i,))
            product = cur.fetchone()

            if product is not None:
                query = (""" UPDATE recommendation_gpu SET products = %s WHERE id = %s""")
                cur.execute(query, (row['recommendations'], i))
                con.commit()
            else:
                new_products.append((i, row))

            
    except(Exception, psycopg2.DatabaseError) as err:
        print(err)
    finally:
        return new_products



def update_cpu(cpu_recs):
    new_products = []
    try:
        for i, row in gpu_recs.iterrow():
            query = ("""SELECT id FROM recommendation_cpu WHERE id = %s""")
            cur.execute(query, (i,))
            product = cur.fetchone()

            if product is not None:
                query = (""" UPDATE recommendation_cpu SET products = %s WHERE id = %s""")
                cur.execute(query, (row['recommendations'], i))
                con.commit()
            else:
                new_products.append((i, row))

            
    except(Exception, psycopg2.DatabaseError) as err:
        print(err)
    finally:
        return new_products

def insert_cpu(id, cpu_arr):
    query = ("""INSERT INTO recommendation_cpu (id, products) VALUES (%s, %s);""")
    cur.execute(query,(id, cpu_arr))
    con.commit()


def insert_gpu(id, gpu_arr):
    query = ("""INSERT INTO recommendation_gpu (id, products) VALUES (%s, %s);""")
    cur.execute(query,(id, gpu_arr))
    con.commit()



def generate_recommendations():
    wishlist_products = get_wishlist(cur, con)

    all_products.set_index('id', inplace=True)
    all_products['all_features'] = all_products['brand'] +" "+ all_products['retailer'] +" "+ all_products['description_cl']
    all_products['all_features'] = all_products['all_features'].apply(lambda x: x.lower())

    vectorizor = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0)
    tfidf_matrix = vectorizor.fit_transform(all_products['all_features'])

    global similarity
    similarity = linear_kernel(tfidf_matrix, tfidf_matrix)

    global rec
    rec = pd.Series(all_products.index)

    gpu_recs, cpu_recs = get_all_product_recommendations(wishlist_products)

    new_gpu = update_gpu(gpu_recs)
    new_cpu = update_cpu(cpu_rec)

    if new_gpu is not None:
        df_gpu = pd.DataFrame(new_gpu, columns=['id', 'recs'])
        for i, row in df_gpu.iterrows():
            insert_gpu(df_gpu['id'], df_gpu['recs'])

    if new_cpu is not None:
        df_cpu = pd.DataFrame(new_cpu, columns=['id', 'recs'])
        for i, row in df_cpu.iterrows():
            insert_cpu(df_cpu['id'], df_cpu['recs'])



def get_wishlist(cur, con):
    query = "SELECT * FROM wishilist_cpu"
    cpus = pd.read_sql_query(query, con)
    cpus = pd.DataFrame(cpus)
    
    query = "SELECT * FROM wishilist_gpu"
    gpus = pd.read_sql_query(query, con)
    
    table = cpus.append(gpus)
    #any preprocessing needing to be done
    #table = remove_columns_from_products(table)
    wishlist_products.drop_duplicates(subset='product_id', keep=False, inplace=True)

    return table 


def get_all_products(cur, con):
    query = "SELECT id, brand, type, description FROM cpus"
    cpus = pd.read_sql_query(query, con)
    cpus = pd.DataFrame(cpus)
    
    query = "SELECT id, brand, type, description FROM gpu"
    gpus = pd.read_sql_query(query, con)
    
    table = cpus.append(gpus)
    
    # any preprocessing needed to be done
    all_products['descriptions_cl'] = all_products['descriptions'].apply(clean_data)
    all_products.drop(['description'], axis=1, inplace=True)
    all_products.dropna(inplace=True)

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


def get_recommendations(df_wishlist):
        recs = []
        wishlist = list(df_wishlist['id'])
        for i, product in enumerate(wishlist):
            response = list(recommend(product).index)
            recs.append(response)
            
        return recs

def get_all_product_recommendations(wishlist_description):
    wishlist_cpu = wishlist_description[wishlist_description['type'] == 'cpu']
    wishlist_gpu = wishlist_description[wishlist_description['type'] == 'gpu']
        
    cpus = get_recommendations(wishlist_cpu)
    gpus = get_recommendations(wishlist_gpu)

    result_cpu = pd.DataFrame(wishlist_cpu['id'], columns=['id','recommendations'])
    result_gpu = pd.DataFrame(wishlist_gpu['id'], columns=['id','recommendations'])

    result_cpu['recommendations'] = cpus
    result_gpu['recommendations'] = gpus

    result_cpu.set_index('id', inplace=True)
    result_gpu.set_index('id', inplace=True)

    return result_gpu, result_cpu


def main():

    #get all products in db and all wishlist products
    
    
    

    #clean products dataframe 
    #all_products.dropna(inplace=True)
    

    #vectorize products and calculate similarity 
    
    #get recommendations for all products in wishlist 
    

    #add result to db

    # if product db is updated:
    #     get new similarities 
    # if wishlists are updated:
    #     get recommendations for new product added and append to recommendation table or
    #     if products is removed from wishlist, remove it from recommendations table 

    con.close()