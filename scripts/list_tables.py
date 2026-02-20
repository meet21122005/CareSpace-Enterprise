import psycopg2

conn = psycopg2.connect(dbname='carespace_db', user='carespace_user', password='carespace123', host='localhost')
cur = conn.cursor()
cur.execute("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename;")
rows = cur.fetchall()
if rows:
    print('Public tables:')
    for r in rows:
        print(' -', r[0])
else:
    print('No public tables found')
cur.close()
conn.close()
