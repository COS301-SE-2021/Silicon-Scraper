import pandas as pd 
import json
import re
import psycopg2
import nltk
import math
import uuid
import psycopg2.extensions
import psycopg2.extras
from psycopg2 import sql
from nltk.corpus import stopwords
from configparser import ConfigParser
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

stopwords = set(stopwords.words('english'))
products = None
rec = None
similarity = None

cur = None
con = None


def get_wishlist(cur, con, types):
    query = ''
    if types == 'cpu':
        query = "SELECT * FROM watchlist_cpu"
    else:
        query = "SELECT * FROM watchlist_gpu"
    
    table = pd.read_sql_query(query, con)
    table = pd.DataFrame(table)
    
    #any preprocessing needing to be done
    #table = remove_columns_from_products(table)
    table.drop_duplicates(subset='product_id', keep=False, inplace=True)

    return table 


def get_all_products(cur, con, types):
    query = ''
    if types == 'cpu':
        query = "SELECT id, brand, retailer, type, description FROM cpus"
    else:
        query = "SELECT id, brand, retailer, type, description FROM gpus"

    table = pd.read_sql_query(query, con)
    table = pd.DataFrame(table)
    
    # any preprocessing needed to be done
    table['description_cl'] = table['description'].apply(clean_data)
    table.drop(['description'], axis=1, inplace=True)
    table.dropna(inplace=True)

    table.rename(columns={'id': 'product_id'}, inplace=True)
    table['all_features'] = table['description_cl']
    table['all_features'] = table['all_features'].apply(lambda x: x.lower())

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
         if i != idx:
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


def update_rec_table(recs, types):
    new_products = []
    if types == "cpu":
        table_name = "recommendation_cpu"
    else:
        table_name = "recommendation_gpu"

    try:

        for i, row in recs.iterrows():
            query = sql.SQL("SELECT product_id FROM {} WHERE product_id = %s").format(sql.Identifier(table_name))
                     
            # query = ("""SELECT product_id FROM recommendation_gpu WHERE product_id = %s""")
            cur.execute(query, (i,))
            product = cur.fetchall()
            
            if product is not None:
                psycopg2.extras.register_uuid()
                # print('NotNone')
                for recs in row['recommendations']:
                    check = [prod[1] for prod in product]
                    
                    if recs not in check:
                        print('im in')
                        query = sql.SQL(" UPDATE {} SET recommended_id = %s WHERE product_id = %s").format(sql.Identifier(table_name))
                        cur.execute(query, (recs, i))
                        con.commit()
            else:
                new_products.append((i, row['recommendations']))
                
            
    except(psycopg2.DatabaseError) as err:
        print(err)
    finally:
        return new_products


def insert_into_table(id, recs_arr, types):
    if types == 'cpu':
        table_name = 'recommendation_cpu'
    else:
        table_name = 'recommendation_gpu'

    psycopg2.extras.register_uuid()
    for rec in recs_arr:
        query = sql.SQL("INSERT INTO {} (product_id, recommended_id) VALUES (%s, %s);").format(sql.Identifier(table_name))
        cur.execute(query,(id, rec))
        con.commit()

def generate_recs(cur, con, types):
    wishlist_products = get_wishlist(cur, con, types)

    global products
    products = get_all_products(cur, con, types)

    vectorizor = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0)
    tfidf_matrix = vectorizor.fit_transform(products['all_features'])

    global similarity
    similarity = linear_kernel(tfidf_matrix, tfidf_matrix)
    
    global rec
    rec = pd.Series(products['product_id'])
    
    temp = []
    global products
    products.set_index('product_id', inplace=True)
    wishlist_products.reset_index()
    for i, pro in products.iterrows():
        for j, wish in wishlist_products.iterrows():
            if i == wish['product_id']:
                temp.append((wish['product_id'], pro['type']))

    wishlist = pd.DataFrame(temp, columns = ['product_id', 'type'])
    recs = get_recommendations(wishlist)

    wishlist['recommendations'] = recs
    wishlist.set_index('product_id', inplace=True)

    new_recs = update_rec_table(wishlist, types)

    if new_recs is not None:
        df_recs = pd.DataFrame(new_recs, columns=['id', 'recs'])
        
        for i, row in df_recs.iterrows():
            insert_into_table(row['id'], row['recs'], types)

    con.close()


#if a change was made to the products table
def generate_recommendations(curr, conn):
    global con
    con = conn

    global cur
    cur = curr
    
    generate_recs(cur, con, 'cpu')
    generate_recs(cur, con, 'gpu')



#if a change was made to a users wishlist
def update_recommendations(curr, conn, payload):

    global con
    con = conn

    global cur
    cur = curr

    global all_products
    all_products = get_all_products(cur, con, 'cpu')
    all_products.append(get_all_products(cur, con, 'gpu'))

    wishlist_products = get_wishlist(cur, con, 'cpu')
    wishlist_products.append(get_wishlist(cur, con, 'gpu'))
    wishlist_products.drop_duplicates(subset='product_id', keep=False, inplace=True)

    try:
        delete = True
        #find the type
        all_products.set_index('product_id', inplace=True)
        for i, pro in all_products.iterrows():
            if i == payload['product_id']:
                payload['type'] = pro['type']

        if payload['type'] == 'cpu':
            table_name = 'recommendation_cpu'
        else:
            table_name = "recommendation_gpu"

        #if an item was removed from watchlist
        #check if its in the wishlist
        wishlist_products.reset_index()
        for j, wish in wishlist_products.iterrows():
            if payload['product_id'] == wish['product_id']:
                delete = False


        if delete == True:
            query = sql.SQL("DELETE FROM {} WHERE product_id = %s").format(sql.Identifier(table_name))
            cur.execute(query, (payload['product_id'],))
            rows_deleted = cur.rowcount
            con.commit()
                
        # if perhaps a product was added to someones wishlist
        query = sql.SQL("SELECT * FROM {} WHERE product_id = %s").format(sql.Identifier(table_name))
        cur.execute(query, (payload['product_id']))
        res = fetchall()
        product = pd.DataFrame(res)

        if res is None:
            items = list(recommend(payload['product_id']))
            insert_into_table(payload['product_id'], items, payload['type'])




        # for i, row in wishlist_products.iterrows():
        #     item = all_products[all_products.index == row['product_id']]
        #     if item['type'].item() == 'cpu':
        #         query = (""" SELECT id FROM recommendation_cpu WHERE product_id = %s""")
        #         cur.execute(query, (row['product_id'],))
        #         product = cur.fetchone()

        #         if product is None:
        #             items = list(recommend(row['product_id']))
        #             insert_cpu(row['product_id'], items)

        #     elif item['type'].item() == 'gpu':
        #         query = (""" SELECT id FROM recommendation_gpu WHERE product_id = %s""")
        #         cur.execute(query, (row['product_id'],))
        #         product = cur.fetchone()

        #         if product is None:
        #             items = list(recommend(row['product_id']))
        #             insert_gpu(row['product_id'], items, payload['type'])


        # # if a product was removed from someones wishlist 
        # query = ("""SELECT product_id from recommendation_gpu""")
        # gpus = pd.read_sql_query(query, con)
        # gpus = pd.DataFrame(gpus)

        # query = ("""SELECT product_id from recommendation_cpu""")
        # cpus = pd.read_sql_query(query, con)
        # table = gpus.append(cpus)

        # items = [i for i in str(table['id'].values) if i not in str(wishlist_products['product_id'].values)]
        # #items = table[table['id'].values not in wishlist_products['product_id'].values]
        # if items is not None:
        #     for item in items:
        #         if item in gpus['id'].values:
        #             query = ("""DELETE FROM recommendation_gpu WHERE product_id = %s""")
        #             cur.execute(query, (item,))
        #         else:
        #             query = ("""DELETE FROM recommendation_cpu WHERE product_id = %s""")
        #             cur.execute(query, (item,))
        #     con.commit()

    except(psycopg2.DatabaseError) as err:
        print(err)
    finally:
        con.close()
    

            


