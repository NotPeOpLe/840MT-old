import pymysql
import requests
import config
import json
import OsuAPI
import time
import mods
import logging as l

week = [
    ["2020-07-01","2020-07-07",1],
    ["2020-07-08","2020-07-14",2],
    ["2020-07-15","2020-07-21",3],
    ["2020-07-22","2020-07-28",4],
    ["2020-07-29","2020-08-04",5],
    ["2020-08-05","2020-08-11",6],
    ["2020-08-12","2020-08-18",7],
    ["2020-08-19","2020-08-25",8],
    ["2020-08-26","2020-09-01",9],
    ["2020-09-02","2020-09-08",10]
]

now_date = time.strftime("%Y-%m-%d", time.gmtime())
now_week = week[0]
for d in week:
    if now_date >= d[0] and now_date <= d[1]:
        now_week = d
        break

def sql_execute(value,fetchone=False):
    db = pymysql.connect(
        host=config.SQLserver,
        user=config.SQLuser,
        passwd=config.SQLpw,
        database=config.SQLdb,
        charset="utf8",
        cursorclass=pymysql.cursors.DictCursor
    )

    c = db.cursor()
    c.execute(value)
    db.commit()
    db.close()

    if fetchone:
        return c.fetchone()
    else:
        return c.fetchall()
    
def get_count():
    return sql_execute("select * from count",fetchone=True)
    
def get_beatmaps_list():
    beatmap_list = []
    row = sql_execute("SELECT beatmap_id FROM beatmaps")
    for bid in row:
        beatmap_list.append(int(bid['beatmap_id']))
    return beatmap_list

def get_maps():
    return sql_execute("SELECT beatmapset_id,artist,title,creator,count(beatmapset_id) AS count_map, MAX(difficultyrating) AS maindiff,beatmap_id FROM beatmaps GROUP BY beatmapset_id ORDER BY beatmapset_id")
    
def get_beatmap(mapid: int):
    return sql_execute('SELECT * FROM beatmaps WHERE beatmap_id = %d' % mapid,fetchone=True)

def get_beatmapset(setid: int):
    mapid = []
    map_mata = sql_execute('SELECT beatmapset_id, artist, artist_unicode, title, title_unicode, creator FROM beatmaps WHERE beatmapset_id = %d LIMIT 1' % setid,fetchone=True)

    mapids = sql_execute('SELECT beatmap_id,version,difficultyrating FROM beatmaps WHERE beatmapset_id = %d ORDER BY difficultyrating' % setid)
    for m in mapids:
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
    map_mata['mapids'] = mapid
    return map_mata

def get_all_users(req=None):
    user_list = []
    if req == 'id':
        for i in sql_execute("SELECT user_id FROM users order by user_id"):
            user_list.append(i['user_id'])
        return user_list
    elif req == 'name':
        for i in sql_execute("SELECT username FROM users order by username"):
            user_list.append(i['username'])
        return user_list
    else:
        return sql_execute("SELECT user_id, username FROM users order by username")

def get_user(user_id: int):
    user = sql_execute(f"SELECT * FROM users WHERE user_id={user_id}",fetchone=True)
    if user == ():
        return None
    p = sql_execute(f"with a as (select distinct beatmap_id from scores where user_id = {user_id} order by beatmap_id) select (select count(*) from a) as 'played_maps'",fetchone=True)
    user['played_maps'] = p['played_maps']
    return user

def get_userid(username: str): 
    user = sql_execute(f"SELECT * FROM users WHERE username='{username}'",fetchone=True)
    if user == ():
        return None
    return user['user_id']

def get_scores(user_id: int):
    scores = sql_execute(f"SELECT * FROM scores WHERE user_id={user_id} ORDER BY date DESC LIMIT 50")
    for d in scores:
        d['enabled_mods'] = mods.formatMods(d['enabled_mods'])
    return scores

def get_ranking(ar=False):
    ranking_type = "achievement_rate" if ar else "rank_score"
    return sql_execute("SELECT rank() OVER (ORDER BY %s desc) AS `rank`, ranking.* from ranking" % ranking_type)

def get_week_ranking(ar=False,start_date=now_week[0], end_date=now_week[1]):
    ranking_type = "achievement_rate" if ar else "rank_score"
    return sql_execute("with data_1 as ( select s.user_id AS user_id, u.username AS Username, u.country_code AS country_code, count(s.user_id) AS play_count, ( sum(s.accuracy) / ( select count.beatmaps from count ) ) AS achievement_rate, avg(s.accuracy) AS Accuracy, sum(s.score) AS total_score from ( scores s join users u ) where (s.user_id = u.user_id) and ( s.date > '{0}' and s.date < '{1}' ) group by u.user_id ), data_2 as ( select s.user_id AS user_id, s.beatmap_id AS beatmap_id, max(s.score) AS bestscore, s.rank AS 'rank' from scores s where ( s.date > '{0}' and s.date < '{1}' ) group by s.beatmap_id, s.user_id order by s.user_id ), data_3 as ( select d.user_id AS user_id, sum(d.bestscore) AS rank_score, sum( ( case when ( (d.rank = 'X') or (d.rank = 'XH') ) then 1 else 0 end ) ) AS SS, sum( ( case when ( (d.rank = 'S') or (d.rank = 'SH') ) then 1 else 0 end ) ) AS S, sum( ( case when (d.rank = 'A') then 1 else 0 end ) ) AS A from ( data_2 d join users u ) where (d.user_id = u.user_id) group by u.user_id ), week_ranking as ( select a.user_id AS user_id, a.Username AS username, a.country_code AS country_code, a.play_count AS play_count, a.achievement_rate AS achievement_rate, a.Accuracy AS accuracy, a.total_score AS total_score, b.rank_score AS rank_score, b.SS AS SS, b.S AS S, b.A AS A from ( data_1 as a left join data_3 b on((a.user_id = b.user_id)) )) SELECT rank() OVER (ORDER BY {2} desc) AS 'rank', week_ranking.* from week_ranking".format(start_date, end_date, ranking_type))

def get_myfirst(user_id: int):
    scores = sql_execute(f'select s.*, u.username, b.* from scores as `s` inner join users as `u` on s.user_id = u.user_id inner join beatmaps as `b` on s.beatmap_id = b.beatmap_id where s.score = (select max(score) from scores where beatmap_id=s.beatmap_id AND s.user_id = {user_id}) group by s.beatmap_id')
    for s in scores:
        s['enabled_mods'] = mods.formatMods(s['enabled_mods'])
    return scores

def get_beatmap_ranking(map_id: int):
    ranking = sql_execute(f"SELECT RANK() OVER(ORDER BY S.score DESC) as `ranking`, s.*, u.username, u.country_code as 'country' FROM scores AS s inner join users as u on u.user_id=s.user_id WHERE S.score=(SELECT MAX(S.score) FROM scores AS S WHERE U.user_id=S.user_id AND S.beatmap_id={map_id}) GROUP BY u.user_id ORDER BY S.score DESC")
    
    for r in ranking:
        r['enabled_mods'] = mods.formatMods(r['enabled_mods'])
    return ranking

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

        sql_execute(f"INSERT INTO beatmaps (beatmapset_id,beatmap_id,approved,total_length,hit_length,version,file_md5,cs,od,ar,hp,mode,artist,artist_unicode,title,title_unicode,creator,creator_id,bpm,difficultyrating) \
            VALUES ({str_b})")

        print("import beatmaps:{} {} - {} [{}].".format(imp["beatmap_id"], imp["artist"], imp["title"], imp["version"]))
        

def update_user(user):
    user_sql = get_user(user['id'])

    if user['id'] not in get_all_users('id'):
        sql_execute(f'delete from users where user_id={user["id"]}')
        return None

    # 被動觸發改名
    if (user['id'] == user_sql['user_id']) and (user['username'] != user_sql['username']):
        if user_sql['username'] in user['previous_usernames']:
                sql_execute(f'update 840MT.users set username="{user["username"]}" where user_id={user["id"]}')
    
    if user['cover_url'] != user_sql['cover_url']:
        sql_execute(f'update 840MT.users set cover_url="{user["cover_url"]}" where user_id={user["id"]}')
    
    if (user['country']['code'] != user_sql['country_code']) or (user['country']['name'] != user_sql['country_name']):
        sql_execute(f'update 840MT.users set country_code="{user["country"]["code"]}",country_name="{user["country"]["name"]}" where user_id={user["id"]}')
    
    return get_user(user["id"])

def import_user(user):
    if user.get('id') in get_all_users('id'):
        raise Exception
    imp_u = []
    imp_u.append(user['id'])
    imp_u.append(user['username'])
    imp_u.append(user['country']['code'])
    imp_u.append(user['country']['name'])
    imp_u.append(time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime()))
    imp_u.append(user['cover_url'])

    str_u = str(imp_u)[1:-1]

    sql_execute(f"INSERT INTO users (user_id,username,country_code,country_name,join_date,cover_url) \
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

    sql_execute(f"INSERT INTO scores VALUES ({str_s})")
    
    
    l.info(f"submit_score uid:{imp_s[11]} b:{imp_s[0]} score:{imp_s[1]} {imp_s[13]} ticks:{imp_s[12]}")


def update_all_users():
    i = 0
    for u in get_all_users('id'):
        update_user(u)
        i += 1
    print(i,'位玩家已更新')