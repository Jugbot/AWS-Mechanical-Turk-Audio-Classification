import os
import sys

try:
    print(os.environ['DATABASE_URL'])
except:
    print("db url not found")
sys.stdout.flush()

from server.main import app


