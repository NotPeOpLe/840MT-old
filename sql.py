import pymysql
import requests
import config
import json
import OsuAPI
import time
import mods
import logging as l

conn = pymysql.connect(
    host=config.SQLserver,
    user=config.SQLuser,
    passwd=config.SQLpw,
    database=config.SQLdb,
    charset="utf8",
    cursorclass=pymysql.cursors.DictCursor
)
c = conn.cursor()

def execute(value):
    conn.ping(reconnect=True)
    c.execute(value)
    conn.commit()
    # try:
    #     c.execute(value)
    #     conn.commit()
    # except Exception:
    #     conn.rollback()

def get_count():
    execute("select * from count")
    
    row = c.fetchone()
    return row
    
def get_beatmaps_list():
    beatmap_list = []
    execute("SELECT beatmap_id FROM beatmaps")
    
    row = c.fetchall() 
    for bid in row:
        beatmap_list.append(int(bid['beatmap_id']))
    return beatmap_list

def get_maps():
    data = []
    execute("""
        SELECT beatmapset_id,artist,title,creator,count(beatmapset_id) AS count_map, MAX(difficultyrating) AS maindiff,beatmap_id
        FROM beatmaps 
        GROUP BY beatmapset_id 
        ORDER BY beatmapset_id
        """)
    return c.fetchall()

def get_beatmap(mapid: int):
    data = {}
    execute('SELECT * FROM beatmaps WHERE beatmap_id = %d' % mapid)
    return c.fetchone()

def get_beatmapset(setid: int):
    mapid = []
    execute('SELECT beatmapset_id, artist, artist_unicode, title, title_unicode, creator FROM beatmaps WHERE beatmapset_id = %d LIMIT 1' % setid)
    data = c.fetchone()
    execute('SELECT beatmap_id,version,difficultyrating FROM beatmaps WHERE beatmapset_id = %d ORDER BY difficultyrating' % setid)
    
    row = c.fetchall() 
    for m in row:
        diff_color = "secondary"
        if m["difficultyrating"] < 2:
            diff_color = "success"
        elif m["difficultyrating"] < 2.7:
            diff_color = "info"
        elif m["difficultyrating"] < 4:
            diff_color = "warning"
        elif m["difficultyrating"] < 5.3:
            diff_color = "danger"
        elif m["difficultyrating"] < 6.5:
            diff_color = "primary"
        elif m["difficultyrating"] > 6.5:
            diff_color = "dark"

        mapid.append([m["beatmap_id"],m["version"],m["difficultyrating"],diff_color])
    data['mapids'] = mapid
    return data

def get_all_users(req=None):
    user_list = []
    if req == 'id':
        execute("SELECT user_id FROM users order by user_id")
        for i in c.fetchall():
            user_list.append(i['user_id'])
        return user_list
    elif req == 'name':
        execute("SELECT username FROM users order by username")
        for i in c.fetchall():
            user_list.append(i['username'])
        return user_list
    else:
        execute("SELECT user_id, username FROM users order by username")
        return c.fetchall()

def get_user(user_id: int):
    execute(f"SELECT * FROM users WHERE user_id={user_id}")
    row = c.fetchone() 
    if row is None:
        return None
    
    user = OsuAPI.get_user(row['user_id'])
    print('apiget',user['username'])

    # 被動觸發改名
    if (user['id'] == row['user_id']) and (user['username'] != row['username']):
        for pu in user['previous_usernames']:
            if pu == row['username']:
                execute(f'update 840MT.users set users.username=`{user["username"]}` where user_id={row["user_id"]}')

    execute(f"with a as (select distinct beatmap_id from scores where user_id = {user_id} order by beatmap_id) \
        select (select count(*) from a) as 'played_maps'")
    p = c.fetchone() 

    user['played_maps'] = str(p['played_maps'])
    return user

def get_userid(username: str, ID=False):
    if ID:
        execute(f"SELECT * FROM users WHERE user_id='{username}'")
        row = c.fetchone()
        return row

    execute(f"SELECT * FROM users WHERE username='{username}'")
    row = c.fetchone()
    if row is None:
        return None
    return row['user_id']

def get_user_old(user_id=0):
    execute(f"SELECT user_id, username, country FROM users WHERE user_id={user_id}")
    data = c.fetchone()

    execute(f"with a as (select distinct beatmap_id from scores where user_id = {user_id} order by beatmap_id) \
        select (select count(*) from a) as 'played_maps'")
    p = c.fetchone() 
    data['played_maps'] = p['played_maps']
    return data

def get_scores(user_id: int):
    if user_id == -1:
        execute(f"SELECT * FROM scores LIMIT 10")
        
        data = c.fetchall() 
    else:
        execute(f"SELECT * FROM scores WHERE user_id={user_id} ORDER BY date DESC LIMIT 10")
        
        data = c.fetchall()

    for d in data:
        d['enabled_mods'] = mods.formatMods(d['enabled_mods'])
    return data

def get_ranking(ar=False):
    ranking_type = "achievement_rate" if ar else "rank_score"
    execute("SELECT rank() OVER (ORDER BY %s desc) AS `rank`, ranking.* from ranking" % ranking_type)
    return c.fetchall()

def get_myfirst(user_id: int):
    execute(f'''select s.*, u.username, b.*
        from scores as `s`
        inner join users as `u` on s.user_id = u.user_id
        inner join beatmaps as `b` on s.beatmap_id = b.beatmap_id
        where s.score = (select max(score) from scores where beatmap_id=s.beatmap_id) AND s.user_id = {user_id}
        group by s.beatmap_id''')
    data = c.fetchall()
    
    for d in data:
        d['enabled_mods'] = mods.formatMods(d['enabled_mods'])
    
    return data

def get_beatmap_ranking(map_id: int):
    execute(f'''SELECT RANK() OVER(ORDER BY S.score DESC) as `ranking`, S.rank as `rank`, S.score as `score`, 
        S.accuracy as `accuracy`, U.country as `country`, U.username as `username`, S.maxcombo as `maxcombo`,
        S.`count300` as `count300`, S.count100 as `count100`, S.count50 as `count50`, S.countmiss as `countmiss`,
        S.enabled_mods as `enabled_mods`, U.user_id as `user_id`, S.date as `date`
        FROM scores AS S, users AS U WHERE S.score=(SELECT MAX(S.score)
        FROM scores AS S WHERE U.user_id=S.user_id AND S.beatmap_id={map_id}) 
        GROUP BY U.user_id ORDER BY S.score DESC''')
    
    data = c.fetchall()
    for d in data:
        d['enabled_mods'] = mods.formatMods(d['enabled_mods'])
    return data

def import_beatmaps(beatmaps):
    if type(beatmaps) == list:
        for beatmaps_id in beatmaps:
            import_beatmap_sql(OsuAPI.get_beatmap(beatmaps_id))
    else:
        import_beatmap_sql(OsuAPI.get_beatmap(beatmaps))


def import_beatmapsets(beatmapsets):
    if type(beatmapsets) == list:
        for beatmapsets_id in beatmapsets:
            beatmapset = OsuAPI.get_beatmapset(beatmapsets_id)
            for beatmap in beatmapset:
                import_beatmap_sql([beatmap])
    else:
        beatmapset = OsuAPI.get_beatmapset(beatmapsets)
        for beatmap in beatmapset:
            import_beatmap_sql([beatmap])

def import_beatmap_sql(b):
    for imp in b:
        if imp["mode"] != '0':
            return
        imp_b = []
        imp_b.append(imp['beatmapset_id'])  # beatmapset_id
        imp_b.append(imp["beatmap_id"])  # beatmap_id
        imp_b.append(imp["approved"])  # approved
        imp_b.append(imp["total_length"])  # total_length
        imp_b.append(imp["hit_length"])  # hit_length
        imp_b.append(imp["version"])  # version
        imp_b.append(imp["file_md5"])  # file_md5
        imp_b.append(imp["diff_size"])  # cs
        imp_b.append(imp["diff_overall"])  # od
        imp_b.append(imp["diff_approach"])  # ar
        imp_b.append(imp["diff_drain"])  # hp
        imp_b.append(imp["mode"])  # mode
        imp_b.append(imp["artist"])  # artist
        imp_b.append(imp["artist_unicode"] if None else imp["artist_unicode"]) # artist_unicode
        imp_b.append(imp["title"])  # title
        imp_b.append(imp["title_unicode"] if None else imp["title_unicode"])  # title_unicode
        imp_b.append(imp["creator"])  # creator
        imp_b.append(imp["creator_id"])  # creator_id
        imp_b.append(imp["bpm"])  # bpm
        imp_b.append(imp["difficultyrating"])  # difficultyrating

        str_b = str(imp_b)[1:-1]

        execute(f"INSERT INTO beatmaps (beatmapset_id,beatmap_id,approved,total_length,hit_length,version,file_md5,cs,od,ar,hp,mode,artist,artist_unicode,title,title_unicode,creator,creator_id,bpm,difficultyrating) \
            VALUES ({str_b})")

        print("import beatmaps:{} {} - {} [{}].".format(imp["beatmap_id"], imp["artist"], imp["title"], imp["version"]))
        



def import_user(user,access_token='',refresh_token=''):
    execute(f"SELECT user_id FROM users WHERE user_id")
    imp_u = []
    imp_u.append(user['id'])
    imp_u.append(user['username'])
    imp_u.append(user['country_code'])
    imp_u.append(access_token)
    imp_u.append(refresh_token)
    imp_u.append(time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime()))

    str_u = str(imp_u)[1:-1]

    execute(f"INSERT INTO users (user_id,username,country,access_token,refresh_token,join_date) \
        VALUES ({str_u})")

def submit_score(score):
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

    execute(f"INSERT INTO scores VALUES ({str_s})")
    
    
    l.info(f"submit_score uid:{imp_s[11]} b:{imp_s[0]} score:{imp_s[1]} {imp_s[13]} ticks:{imp_s[12]}")

# 取玩家圖譜最高分的
# select * from scores where beatmap_id=1482747 and user_id=6008293 order by score desc limit 1

# 圖譜排名
# select * from scores where beatmap_id=1482745 group by user_id order by score desc

# select RANK() OVER(order by score desc) as rank,* from scores where beatmap_id=1482745 group by user_id  
def close():
    conn.close()