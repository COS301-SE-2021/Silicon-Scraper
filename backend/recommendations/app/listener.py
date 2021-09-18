import psycopg2
import Recommender
import psycopg2.extensions
from instance.config import config 

cwd = os.path.dirname(__file__)

#This function facilitates the connection to the database
def connect():
    try:
        params = config()

        #params = config()
        #print(host, port, password, user, database)
        # host=host, port=port, database=database, user=user, password=password
        conn = psycopg2.connect(**params)
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)

        curr = conn.cursor()

    except( Exception, psycopg2.DatabaseError) as err:
        print(err)
    finally:
        return curr, conn

 
def listener():
    cur, con = connect()
    cur.execute('LISTEN table_modified')

    if select.select([conn],[],[],5) == ([],[],[]):
        print 'Timeout'
    else:
        con.poll()
        while con.notifies:
            notify = con.notifies.pop(0)
            if notify.channel == 'table_modified':
                #get new similarity table
                generate_recommendations()
                
            elif notify.channel == 'watchlist_modified':
                #remove product from recommendation table or add new porduct to recommendation table
                update_recommendations()

