import requests
import json
import config
from bs4 import BeautifulSoup

urlv1 = "https://osu.ppy.sh/api/"
urlv2 = "https://osu.ppy.sh/api/v2/"
CLIENT_ID = config.CLIENT_ID
CLIENT_SCERET = config.CLIENT_SECRET
REDIRECT_URL = config.REDIRECT_URL

def authorize(state, scope):
    return f"https://osu.ppy.sh/oauth/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URL}&state={state}&scope={scope}"

def get_token(code):
    url = "https://osu.ppy.sh/oauth/token"

    payload = f'grant_type=authorization_code&client_id={CLIENT_ID}&client_secret={CLIENT_SCERET}&redirect_uri={REDIRECT_URL}&code={code}'
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
    }

    r = requests.request("POST", url, headers = headers, data = payload)
    return r.json()

def get_user(token: str):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f"Bearer {token}"
    }
    r = requests.get(urlv2+"me/osu", headers = headers)
    return r.json()

def get_user(user_id: int):
    re = requests.get(f'https://osu.ppy.sh/users/{user_id}')
    soup = BeautifulSoup(re.text, 'html.parser')
    o = json.loads(soup.html.find(id='json-user').string.strip('\n').strip())
    return o

def get_beatmap(map_id):
    url = urlv1 + "get_beatmaps"
    params = f"k={config.API_KEY}&b={map_id}"
    r = requests.get(url, params)
    return r.json()

def get_beatmapset(set_id):
    url = urlv1 + "get_beatmaps"
    params = f"k={config.API_KEY}&s={set_id}"
    r = requests.get(url, params)
    return r.json()

def get_user_recent(user_id):
    url = urlv1 + "get_user_recent"
    params = f"k={config.API_KEY}&u={user_id}&limit=50&m=0&type=id"
    r = requests.get(url, params, timeout=5)
    return r.json()

def get_old_user(user_id):
    url = urlv1 + "get_user"
    params = f"k={config.API_KEY}&u={user_id}&type=id"
    r = requests.get(url, params)
    return r.json()