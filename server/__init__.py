import os


try:
    print(os.environ['DATABASE_URL'])
except:
    print("db url not found")

from server.main import app


