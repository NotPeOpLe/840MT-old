import pymysql
import requests
import config
import json
import OsuAPI
import time
import mods

conn = pymysql.connect(
    host=config.SQLserver,
    user=config.SQLuser,
    passwd=config.SQLpw,
    database=config.SQLdb,
    charset="utf8"
)
c = conn.cursor()

def get_count():
    c.execute("select (select count(*) from beatmaps),\
    (select count(*) from users),\
    (select count(*) from scores)")
    conn.commit()
    row = c.fetchone()
    return [row[0],row[1],row[2]]
    
def get_beatmaps_list():
    beatmap_list = []
    c.execute("SELECT beatmap_id FROM beatmaps")
    conn.commit()
    row = c.fetchall() 
    for bid in row:
        beatmap_list.append(int(bid[0]))
    return beatmap_list

def get_maps():
    data = []
    c.execute("""
        SELECT beatmapset_id,artist,title,creator,count(beatmapset_id) AS count_map, MAX(difficultyrating) AS maindiff,beatmap_id
        FROM beatmaps 
        GROUP BY beatmapset_id 
        ORDER BY beatmapset_id
        """)
    conn.commit()
    row = c.fetchall() 
    for item in row:
        d = {
            'beatmapset_id': item[0],
            'artist': item[1],
            'title': item[2],
            'creator': item[3],
            'count_map': item[4],
            'maindiff_id': item[6]
        }
        data.append(d)

    return data

def get_beatmap(mapid: int):
    data = {}
    c.execute('SELECT * FROM beatmaps WHERE beatmap_id = %d' % mapid)
    conn.commit()
    row = c.fetchall() 
    for d in row:
        data = {
            'beatmapset_id': d[0],
            'beatmap_id': d[1],
            "approved": d[2],
            "total_length": d[3],
            "hit_length": d[4],
            "version": d[5],
            "file_md5": d[6],
            "cs": d[7],
            "od": d[8],
            "ar": d[9],
            "hp": d[10],
            "mode": d[11],
            "artist": d[12],
            "artist_unicode": d[13],
            "title": d[14],
            "title_unicode": d[15] ,
            "creator": d[16],
            "creator_id": d[17],
            "bpm": d[18],
            "difficultyrating": d[19]
        }
    return data

def get_beatmapset(setid: int):
    data = {}
    mapid = []
    c.execute('SELECT beatmapset_id, artist, artist_unicode, title, title_unicode, creator FROM beatmaps WHERE beatmapset_id = %d LIMIT 1' % setid)
    conn.commit()
    row = c.fetchall() 
    for d in row:
        data = {
            'beatmapset_id': d[0],
            "artist": d[1],
            "artist_unicode": d[2],
            "title": d[3],
            "title_unicode": d[4] ,
            "creator": d[5]
        }
    c.execute('SELECT beatmap_id,version,difficultyrating FROM beatmaps WHERE beatmapset_id = %d ORDER BY difficultyrating' % setid)
    conn.commit()
    row = c.fetchall() 
    for m in row:
        diff_color = "secondary"
        if m[2] < 2:
            diff_color = "success"
        elif m[2] < 2.7:
            diff_color = "info"
        elif m[2] < 4:
            diff_color = "warning"
        elif m[2] < 5.3:
            diff_color = "danger"
        elif m[2] < 6.5:
            diff_color = "primary"
        elif m[2] > 6.5:
            diff_color = "dark"

        mapid.append([m[0],m[1],m[2],diff_color])
    data['mapids'] = mapid
    return data

def get_all_users():
    c.execute("SELECT user_id, username FROM users")
    conn.commit()
    row = c.fetchall() 
    user_list = []
    for uid in row:
        user_list.append(uid)
    return user_list

def get_user(user_id=0,username=''):
    c.execute(f"SELECT * FROM new_users WHERE user_id={user_id}")
    conn.commit()
    row = c.fetchall() 
    for d in row:
        user = OsuAPI.get_user(d[3])
    return user

def get_user_old(user_id=0):
    data = {}
    c.execute(f"SELECT * FROM users WHERE user_id={user_id}")
    conn.commit()
    row = c.fetchall() 

    for d in row:
        data['user_id'] = d[0]
        data['username'] = d[1]
        data['country'] = d[2]
    return data

def get_scores(user_id: int):
    data = []
    if user_id == -1:
        c.execute(f"SELECT * FROM scores")
        conn.commit()
        row = c.fetchall() 
    else:
        c.execute(f"SELECT * FROM scores WHERE user_id={user_id} ORDER BY date DESC")
        conn.commit()
        row = c.fetchall() 

    for s in row:
        d = {
            "beatmap_id": s[0],
            "score": s[1],
            "maxcombo": s[2],
            "count50": s[3],
            "count100": s[4],
            "count300": s[5],
            "countmiss": s[6],
            "countkatu": s[7],
            "countgeki": s[8],
            "perfect": s[9],
            "enabled_mods": mods.formatMods(s[10]),
            "user_id": s[11],
            "date": s[12],
            "rank": s[13],
            "accuracy": s[14]
        }
        data.append(d)
    return data

def get_ranking():
    data = []
    c.execute('''SELECT RANK() OVER(ORDER BY B.rank_score DESC), A.*, B.rank_score, B.SS, B.S, B.A 
                    FROM ranking_statistics1 A
                    LEFT JOIN ranking_statistics2 B
                    ON A.user_id = B.user_id''')
    conn.commit()
    row = c.fetchall()
    for s in row:
        d = {
            "rank": s[0],
            "user_id": s[1],
            "username": s[2],
            "country": s[3],
            "play_count": s[4],
            "accuracy": s[5],
            "total_score": s[6],
            "rank_score": s[7],
            "SS": s[8],
            "S": s[9],
            "A": s[10]
        }
        data.append(d)
    return data

def get_beatmap_ranking(map_id: int):
    data = []
    c.execute(f'''SELECT RANK() OVER(ORDER BY S.score DESC), S.rank, S.score, S.accuracy, U.country, U.username, S.maxcombo, S.count300, S.count100, S.count50, S.countmiss, S.enabled_mods, U.user_id  
                FROM scores AS S, users AS U WHERE S.score=(SELECT MAX(S.score) FROM scores AS S WHERE U.user_id=S.user_id AND S.beatmap_id={map_id}) GROUP BY U.user_id ORDER BY S.score DESC''')
    conn.commit()
    row = c.fetchall()
    for s in row:
        d = {
            "ranking": s[0],
            "rank": s[1],
            "score": s[2],
            "accuracy": s[3],
            "country": s[4],
            "username": s[5],
            "maxcombo": s[6],
            "count300": s[7],
            "count100": s[8],
            "count50": s[9],
            "countmiss": s[10],
            "enabled_mods": mods.formatMods(s[11]),
            "user_id": s[12]
        }
        data.append(d)

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

        c.execute(f"INSERT INTO beatmaps (beatmapset_id,beatmap_id,approved,total_length,hit_length,version,file_md5,cs,od,ar,hp,mode,artist,artist_unicode,title,title_unicode,creator,creator_id,bpm,difficultyrating) \
            VALUES ({str_b})")

        print("import beatmaps:{} {} - {} [{}].".format(imp["beatmap_id"], imp["artist"], imp["title"], imp["version"]))
        conn.commit()



def import_user(user,access_token='',refresh_token=''):
    imp_u = []
    imp_u.append(user['id'])
    imp_u.append(user['username'])
    imp_u.append(user['country_code'])
    imp_u.append(access_token)
    imp_u.append(refresh_token)
    imp_u.append(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))

    str_u = str(imp_u)[1:-1]

    c.execute(f"INSERT INTO users (user_id,username,country,access_token,refresh_token,join_date) \
        VALUES ({str_u})")
    
    print("register {} {}".format(user['id'],user['username']))
    conn.commit()

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

    c.execute(f"INSERT INTO scores VALUES ({str_s})")
    conn.commit()
    
    print(f"submit_score uid:{imp_s[11]} b:{imp_s[0]} score:{imp_s[1]} {imp_s[13]} ticks:{imp_s[12]}")

# 取玩家圖譜最高分的
# select * from scores where beatmap_id=1482747 and user_id=6008293 order by score desc limit 1

# 圖譜排名
# select * from scores where beatmap_id=1482745 group by user_id order by score desc

# select RANK() OVER(order by score desc) as rank,* from scores where beatmap_id=1482745 group by user_id  
