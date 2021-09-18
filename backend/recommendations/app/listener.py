import psycopg2
import os
import select 
from . import Recommender as rec
import psycopg2.extensions
from instance import config 

cwd = os.path.dirname(__file__)

#This function facilitates the connection to the database
def connect():
    try:
        dbcon = config.Config()
        params = dbcon.db_config()

        #params = config()
        #print(host, port, password, user, database)
        # host=host, port=port, database=database, user=user, password=password
        conn = psycopg2.connect(**params)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)

        curr = conn.cursor()
        return curr, conn
    except(psycopg2.DatabaseError) as err:
        print(err)
        

 
def listener():
    cur, con = connect()
    
    cur.execute('LISTEN table_modified')
    cur.execute('LISTEN watchlist_modified')
    print("Listening")

    seconds_passed = 0
    while 1:
        con.commit()
        if select.select([con],[],[],5) == ([],[],[]):
            seconds_passed += 5
            print( "{} seconds passed without a notification...".format(seconds_passed))

        else:
            con.poll()
            while con.notifies:
                notify = con.notifies.pop(0)
                if notify.channel == 'table_modified':
                    #get new similarity table
                    generate_recommendations(db, cur)
                    
                elif notify.channel == 'watchlist_modified':
                    #remove product from recommendation table or add new porduct to recommendation table
                    update_recommendations(db, cur)

