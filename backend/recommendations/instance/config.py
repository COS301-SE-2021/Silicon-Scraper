import os
import psycopg2
from configparser import ConfigParser

database = os.path.join(os.getcwd(), "database.ini")

class Config():
    def __init__(self):
        DEBUG = True
        TESTING = False


    def db_config(self, filename='database.ini', section='postgresql'):
        con = {}
        parser = ConfigParser()
        parser.read(filename)

        if parser.has_section(section):
            con = {
                "host": parser.get(section,'DB_HOST'),
                "port": parser.get(section,'DB_PORT'),
                "database": parser.get(section,'DB_NAME'),
                "user": parser.get(section,'DB_USER'),
                "password": parser.get(section,'DB_PW')
            }


        return con

    def connect(self):
        
        try:
            params = self.db_config()
            global conn
            conn = psycopg2.connect(**params)

            #curr = conn.cursor()
            return conn 
        except(psycopg2.DatabaseError) as err:
            print(err)

    
    