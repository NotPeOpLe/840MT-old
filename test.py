import requests
from bs4 import BeautifulSoup

d = {}
r = requests.get(f'https://osu.ppy.sh/users/6008293')
s = BeautifulSoup(r.text, 'html.parser')
p = s.find(id='json-user')
print(p)