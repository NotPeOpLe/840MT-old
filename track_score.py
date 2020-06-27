from OsuAPI import get_user_recent
from time import sleep, strptime, mktime
import requests
import logging as l
import pymysql
import config
import mods
import json

debug = False

l.basicConfig(
    format='(%(asctime)s) [%(levelname)s]: %(message)s',
    level=l.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)

conn = pymysql.connect(
    host="192.168.0.50",
    user=config.SQLuser,
    passwd=config.SQLpw,
    database=config.SQLdb,
    charset="utf8",
    cursorclass=pymysql.cursors.DictCursor
)
c = conn.cursor()

def post(msg,color=10197915):
    msg = str(msg)
    data = {
        "content": msg
        }
        
    req = requests.post(
        url="https://canary.discordapp.com/api/webhooks/726343706772242442/zYSmWJL0rTrc6CVBjuimnDlFjWFWPX_DEczGY4es0BrYdC9YT1bZAhvyhVykBVeEFlcl",
        headers={'Content-Type': 'application/json',},
        data=json.dumps(data)
    )

def get_sql(value,fetchone=False):
    conn.ping(reconnect=True)
    try:
        c.execute(value)
        conn.commit()
        if fetchone:
            return c.fetchone()
        else:
            return c.fetchall()
            
    except Exception:
        conn.rollback()

def get_beatmaps_list():
    beatmap_list = []
    row = get_sql("SELECT beatmap_id FROM beatmaps")
    
    for r in row:
        beatmap_list.append(r['beatmap_id'])
    return beatmap_list

BList = get_beatmaps_list()
l.debug('載入 {} 張圖譜'.format(len(get_beatmaps_list())))

def get_beatmap(mapid: int):
    data = get_sql(f'SELECT * FROM beatmaps WHERE beatmap_id={mapid}',True)
    return data

def get_beatmapset(setid: int):
    data = get_sql(f'SELECT * FROM beatmaps WHERE beatmapset_id={setid}')
    return data

def get_all_users(req=None):
    user_list = []
    if req == 'id':
        row = get_sql("SELECT user_id FROM users")

        for uid in row:
            user_list.append(uid['user_id'])
        return user_list
    elif req == 'name':
        row = get_sql("SELECT username FROM users")

        for uid in row:
            user_list.append(uid['username'])
        return user_list
    else:
        row = get_sql("SELECT user_id, username FROM users")
        for uid in row:
            user_list.append(list(uid.values()))
        return user_list

def get_user(user_id: int):
    data = get_sql(f"SELECT * FROM users WHERE user_id={user_id}",True)
    if data == ():
        return None

    p = get_sql(f"with a as (select distinct beatmap_id from scores where user_id = {user_id} order by beatmap_id) \
        select (select count(*) from a) as 'played_maps'",True)

    data['played_maps'] = str(p['played_maps'])
    return data
        
def get_scores(user_id: int):
    if user_id == -1:
        data = get_sql(f"SELECT * FROM scores LIMIT 100")
    else:
        data = get_sql(f"SELECT * FROM scores WHERE user_id={user_id} ORDER BY date DESC LIMIT 1000")

    for d in data:
        d['enabled_mods'] = mods.formatMods(d['enabled_mods'])
    return data

def get_beatmap_ranking(map_id: int):
    data = get_sql(f'''SELECT RANK() OVER(ORDER BY S.score DESC) as `ranking`, S.*,U.username
        FROM scores AS S, users AS U WHERE S.score=(SELECT MAX(S.score)
        FROM scores AS S WHERE U.user_id=S.user_id AND S.beatmap_id={map_id} AND S.rank IN('D','C','B','A','S','X','SH','XH')) 
        GROUP BY U.user_id ORDER BY S.score DESC''')
    return data

def submit_score(score):
    before_ranking = get_beatmap_ranking(score['beatmap_id'])
    beatmap = get_beatmap(int(score['beatmap_id']))
    user = get_user(int(score['user_id']))

    songstr = f"{beatmap['artist']} - {beatmap['title']} [{beatmap['version']}]"

    imp_s = []
    imp_s.append(int(score['beatmap_id']))
    imp_s.append(int(score['score']))
    imp_s.append(int(score['maxcombo']))
    imp_s.append(int(score['count50']))
    imp_s.append(int(score['count100']))
    imp_s.append(int(score['count300']))
    imp_s.append(int(score['countmiss']))
    imp_s.append(int(score['countkatu']))
    imp_s.append(int(score['countgeki']))
    imp_s.append(int(score['perfect']))
    imp_s.append(int(score['enabled_mods']))
    imp_s.append(int(score['user_id']))
    imp_s.append(score['date'])
    imp_s.append(score['rank'])
    acc = (int(score['count50'])*50 + int(score['count100'])*100 + int(score['count300'])*300) / ((int(score['count50']) + int(score['count100']) + int(score['count300']) + int(score['countmiss']))*300)
    imp_s.append(float(acc))

    str_s = str(imp_s)[1:-1]

def check_score(user_id, score, sql_scores):
    if int(score['beatmap_id']) in beatmap_list:
        if score['date'] > '2020-05-03 00:00:00':
            for sql_date in sql_scores:
                    if sql_date['date'] == score['date']:
                        return False
        return True
    else:
        return False

def get_recent(user_id):
    i = 0
    while i < 3:
        try:
            r = get_user_recent(user_id)
            return r
        except requests.exceptions.RequestException:
            i += 1

while True:
    users = None
    users = get_all_users()

    for user in users:
        l.debug('讀取 {} 的遊玩紀錄'.format(user[1]))
        sql_scores = get_scores(user[0])
        try:
            scores = get_recent(user[0])
        except requests.RequestException:
            break
            
        for score in scores:
            if check_score(user[0], score, sql_scores):
                submit_score(score)
        sleep(0.4)

while debug:
    sql_scores = get_scores(6008293)
    try:
        scores = get_recent(6008293)
    except requests.RequestException:
        break
            
    for score in scores:
        if check_score(6008293, score, sql_scores):
            submit_score(score)
        sleep(0.5)
