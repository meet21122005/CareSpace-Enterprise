import sys
import psycopg2

try:
    conn = psycopg2.connect(
        dbname='carespace_db',
        user='postgres',
        password='meet@2005',
        host='localhost',
        connect_timeout=10
    )
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute("GRANT ALL PRIVILEGES ON SCHEMA public TO carespace_user;")
    print('GRANT executed successfully')
    cur.close()
    conn.close()
except Exception as e:
    print('ERROR:', e)
    sys.exit(1)
