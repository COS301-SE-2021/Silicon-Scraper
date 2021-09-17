import os
from configParser import ConfigParser

def config(filename='database.ini', section='postgresql'):
    con = {}
    parser = configParser()
    parser.read(filename)
 
    if parser.has_section(section):
        con = {
            "host": parser.get(sectio,'DB_HOST'),
            "port": parser.get(section,'DB_PORT'),
            "database": parser.get(section,'DB_NAME'),
            "user": parser.get(section,'DB_USER'),
            "password": parser.get(section,'DB_PW')
        }


    return con