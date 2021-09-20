import pandas as pd 
import json
import re
import psycopg2
import nltk
import math
import uuid
import psycopg2.extensions
import psycopg2.extras
from nltk.corpus import stopwords
from configparser import ConfigParser
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

stopwords = set(stopwords.words('english'))
all_products = None
rec = None
similarity = None

cur = None
con = None

def get_wishlist(cur, con):
    query = "SELECT * FROM watchlist_cpu"
    cpus = pd.read_sql_query(query, con)
    cpus = pd.DataFrame(cpus)
    
    query = "SELECT * FROM watchlist_gpu"
    gpus = pd.read_sql_query(query, con)
    
    table = cpus.append(gpus)
    #any preprocessing needing to be done
    #table = remove_columns_from_products(table)
    table.drop_duplicates(subset='product_id', keep=False, inplace=True)

    return table 


def get_all_products(cur, con):
    query = "SELECT id, brand, retailer, type, description FROM cpus"
    cpus = pd.read_sql_query(query, con)
    cpus = pd.DataFrame(cpus)
    
    query = "SELECT id, brand, retailer, type, description FROM gpus"
    gpus = pd.read_sql_query(query, con)
    
    table = cpus.append(gpus)
    
    # any preprocessing needed to be done
    table['description_cl'] = table['description'].apply(clean_data)
    table.drop(['description'], axis=1, inplace=True)
    table.dropna(inplace=True)

    return table

# all_products = 


def recommend(idx, cosine = similarity):
    
    #find the index of the product in the index series
    item = rec[rec == idx].index[0]
    
    #get array of similarities and sort them in descending order
    similarities = list(enumerate(similarity[item]))
    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)
    
    #get the top 5 products, excluding the product itself
    similarities = similarities[1:6]
   
    #get index of top 5 
    index = [i[0] for i in similarities]
    
    #get the products using the the retrieved index
     
    prods = all_products.iloc[index]
    resul = []
    for i, row in prods.iterrows():
        
        resul.append(uuid.UUID(i))
    
    return resul


#A function that turns the object description into a string 
#and checks for empty descriptions
def clean_data(text):
    if text == '' or not list(text) or text == {} or text == '{}':
        return math.nan
    # text = json.loads(text)
    final = [(x +"-" + y).lower() for x,y in zip(list(text), list(text.values()))]
    return "  ".join(final)

def similarity_func():
    pass


def get_recommendations(df_wishlist):
        recs = []
        
        wishlist = list(df_wishlist['product_id'])
        for i, product in enumerate(wishlist):
            response = list(recommend(product))
            recs.append(response)
       
        return recs

def get_all_product_recommendations(wishlist_description):
    temp = []
    global all_products
    all_products.set_index('product_id', inplace=True)
    wishlist_description.reset_index()
    for i, pro in all_products.iterrows():
        for j, wish in wishlist_description.iterrows():
            if i == wish['product_id']:
                temp.append((wish['product_id'], pro['type']))
                
    
  
    types = pd.DataFrame(temp, columns = ['product_id', 'type'])
    wishlist_cpu = types[types['type'] == 'cpu']#wishlist_description[wishlist_description['product_id'] == types['product_id'].item() & types['type'].item() == 'cpu']
    wishlist_gpu = types[types['type'] == 'gpu']#wishlist_description[wishlist_description['type'] == 'gpu']
   
    cpus = get_recommendations(wishlist_cpu)
    gpus = get_recommendations(wishlist_gpu)
    
    result_cpu = pd.DataFrame(wishlist_cpu['product_id'], columns=['id','recommendations'])
    result_gpu = pd.DataFrame(wishlist_gpu['product_id'], columns=['id','recommendations'])
    
    wishlist_gpu['recommendations'] = gpus
    wishlist_cpu['recommendations'] = cpus
    
    wishlist_cpu.set_index('product_id', inplace=True)
    wishlist_gpu.set_index('product_id', inplace=True)

    return wishlist_gpu, wishlist_cpu



def update_gpu(gpu_recs):
    new_products = []
   
    try:

        for i, row in gpu_recs.iterrows():
            query = ("""SELECT id FROM recommendation_gpu WHERE id = %s""")
            cur.execute(query, (i,))
            product = cur.fetchone()
            
            if product is not None:
                query = (""" UPDATE recommendation_gpu SET products = %s WHERE id = %s""")
                cur.execute(query, (row['recommendations'], i))
                con.commit()
            else:
                new_products.append((i, row['recommendations']))
                
            
    except(psycopg2.DatabaseError) as err:
        print(err)
    finally:
        return new_products



def update_cpu(cpu_recs):
    new_products = []
    try:
        for i, row in cpu_recs.iterrows():
            query = ("""SELECT id FROM recommendation_cpu WHERE id = %s""")
            cur.execute(query, (i,))
            product = cur.fetchone()

            if product is not None:
                query = (""" UPDATE recommendation_cpu SET products = %s WHERE id = %s""")
                cur.execute(query, (row['recommendations'], i))
                con.commit()
            else:
                new_products.append((i, row['recommendations']))

            
    except(psycopg2.DatabaseError) as err:
        print(err)
    finally:
        return new_products

def insert_cpu(id, cpu_arr):
    psycopg2.extras.register_uuid()
    query = ("""INSERT INTO recommendation_cpu (id, products) VALUES (%s, %s);""")
    cur.execute(query,(id, cpu_arr))
    con.commit()


def insert_gpu(id, gpu_arr):
    psycopg2.extras.register_uuid()
    query = ("""INSERT INTO recommendation_gpu (id, products) VALUES (%s, %s);""")
    cur.execute(query,(id, gpu_arr))
    con.commit()


#if a change was made to the products table
def generate_recommendations(curr, conn):
    global con
    con = conn

    global cur
    cur = curr
    wishlist_products = get_wishlist(cur, con)

    global all_products
    all_products = get_all_products(cur, con)


    #all_products.set_index('id', inplace=True)
    all_products.rename(columns={'id': 'product_id'}, inplace=True)
    all_products['all_features'] = all_products['brand'] +" "+ all_products['retailer'] +" "+ all_products['description_cl']
    all_products['all_features'] = all_products['all_features'].apply(lambda x: x.lower())
    
    vectorizor = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0)
    tfidf_matrix = vectorizor.fit_transform(all_products['all_features'])

    global similarity
    similarity = linear_kernel(tfidf_matrix, tfidf_matrix)
    
    global rec
    rec = pd.Series(all_products['product_id'])
    
    gpu_recs, cpu_recs = get_all_product_recommendations(wishlist_products)
    
    
    new_gpu = update_gpu(gpu_recs)
    new_cpu = update_cpu(cpu_recs)

    if new_gpu is not None:
        df_gpu = pd.DataFrame(new_gpu, columns=['id', 'recs'])
        
        for i, row in df_gpu.iterrows():
            insert_gpu(row['id'], row['recs'])

    if new_cpu is not None:
        df_cpu = pd.DataFrame(new_cpu, columns=['id', 'recs'])
        for i, row in df_cpu.iterrows():
            insert_cpu(row['id'], row['recs'])
    con.close()


#if a change was made to a users wishlist
def update_recommendations(curr, conn ):

    global con
    con = conn

    global cur
    cur = curr

    global all_products
    all_products = get_all_products(cur, con)

    wishlist_products = get_wishlist(cur, con)
    wishlist_products.drop_duplicates(subset='product_id', keep=False, inplace=True)

    try:
        # if perhaps a product was added to someones wishlist
        for i, row in wishlist_products.iterrows():
            item = all_products[all_products.index == row['product_id']]
            if item['type'].item() == 'cpu':
                query = (""" SELECT id FROM recommendation_cpu WHERE id = %s""")
                cur.execute(query, (row['product_id'],))
                product = cur.fetchone()

                if product is None:
                    items = list(recommend(row['product_id']))
                    insert_cpu(row['product_id'], items)

            elif item['type'].item() == 'gpu':
                query = (""" SELECT id FROM recommendation_gpu WHERE id = %s""")
                cur.execute(query, (row['product_id'],))
                product = cur.fetchone()

                if product is None:
                    items = list(recommend(row['product_id']))
                    insert_gpu(row['product_id'], items)


        # if a product was removed from someones wishlist 
        query = ("""SELECT id from recommendation_gpu""")
        gpus = pd.read_sql_query(query, con)
        gpus = pd.DataFrame(gpus)

        query = ("""SELECT id from recommendation_cpu""")
        cpus = pd.read_sql_query(query, con)
        table = gpus.append(cpus)

        items = [i for i in str(table['id'].values) if i not in str(wishlist_products['product_id'].values)]
        #items = table[table['id'].values not in wishlist_products['product_id'].values]
        if items is not None:
            for item in items:
                if item in gpus['id'].values:
                    query = ("""DELETE FROM recommendation_gpu WHERE id = %s""")
                    cur.execute(query, (item,))
                else:
                    query = ("""DELETE FROM recommendation_cpu WHERE id = %s""")
                    cur.execute(query, (item,))
            con.commit()

    except(psycopg2.DatabaseError) as err:
        print(err)
    finally:
        con.close()
    

            


