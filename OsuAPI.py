import requests
import json
import config as c

urlv1 = "https://osu.ppy.sh/api/"
urlv2 = "https://osu.ppy.sh/api/v2/"
CLIENT_ID = c.CLIENT_ID
CLIENT_SCERET = c.CLIENT_SECRET
REDIRECT_URL = c.REDIRECT_URL

def clientToken():
    url = 'https://osu.ppy.sh/oauth/token'

    payload = {'username': c.user,
        'password': c.password,
        'grant_type': 'password',
        'client_id': '5',
        'client_secret': 'FGc9GAtyHzeQDshWP5Ah7dega8hJACAJpQtw6OXk',
        'scope': '*'}
    headers = {
        'Accept': 'application/json',
        'User-Agent': 'osu!',
        'Accept-Encoding': 'gzip, deflate'
    }

    response = requests.request("POST", url, headers=headers, data = payload)
    Token['access_token'] = response.json()['access_token']
    Token['refresh_token'] = response.json()['refresh_token']
    Confile = open('osuToken','w',encoding='utf-8')
    Confile.write(json.dumps(Token))
    Confile.close()
    return
Token = {}
try:
    Confile = open('osuToken','r',encoding='utf-8')
except FileNotFoundError:
    cf = open('osuToken','a')
    cf.close()

try:
    Token = json.loads(Confile.read())
    Confile.close()
except:
    clientToken()

me = requests.get(urlv2+'me',headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token['access_token']
    })

if me.status_code != 200:
    clientToken()

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

def v2req(path: str):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Token['access_token']
    }
    try:
        r = requests.get(urlv2+path, headers = headers)
        return r
    except:
        return None

def get_me(token: str):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    r = requests.get(urlv2+'me/osu', headers = headers)
    return r.json()

def get_user(user_id: int):
    if user_id is None:
        return None
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Token['access_token']
    }

    user = requests.get('%susers/%d' % (urlv2,user_id), headers = headers)
    if user.status_code == 401:
        get_token()
        user = requests.get('%susers/%d' % (urlv2,user_id), headers = headers)

    return user.json()

def get_beatmap(map_id):
    url = urlv1 + "get_beatmaps"
    params = f"k={c.API_KEY}&b={map_id}"
    r = requests.get(url, params)
    return r.json()

def get_beatmapset(set_id):
    url = urlv1 + "get_beatmaps"
    params = f"k={c.API_KEY}&s={set_id}"
    r = requests.get(url, params)
    return r.json()

def get_user_recent(user_id):
    url = urlv1 + "get_user_recent"
    params = f"k={c.API_KEY}&u={user_id}&limit=50&m=0&type=id"
    r = requests.get(url, params, timeout=5)
    return r.json()

def get_old_user(user_id):
    url = urlv1 + "get_user"
    params = f"k={c.API_KEY}&u={user_id}&type=id"
    r = requests.get(url, params)
    return r.json()