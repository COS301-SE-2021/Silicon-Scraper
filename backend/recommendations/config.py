import os
from configParser import ConfigParser

def config(filename='database.ini', section='postgresql'):
    con = {}
    host = ''
    parser = configParser()
    parser.read(filename)
 
    if parser.has_section(section):
        params = parser.items(section)
        for p in params:
            con[p[0]] = p[1]


    return con