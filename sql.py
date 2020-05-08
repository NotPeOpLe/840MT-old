import sqlite3
import requests
import config
import json
import OsuAPI
import time
import mods

conn = sqlite3.connect("data.db", check_same_thread=False)
c = conn.cursor()

def get_count():
    data = {}
    sql_data = c.execute("SELECT * FROM sqlite_sequence")
    for d in sql_data:
        data[d[0]] = d[1]
    return data
    
def get_beatmaps_list():
    beatmap_list = []
    sql_data = c.execute("SELECT beatmap_id FROM beatmaps")
    for bid in sql_data:
        beatmap_list.append(int(bid[0]))
    return beatmap_list

def get_maps():
    data = []
    sql_data = c.execute("""
        SELECT beatmapset_id,artist,title,creator,count(beatmapset_id) AS count_map, MAX(difficultyrating) AS maindiff,beatmap_id
        FROM beatmaps 
        GROUP BY beatmapset_id 
        ORDER BY beatmapset_id
        """)

    for item in sql_data:
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
    sql_data = c.execute('SELECT * FROM beatmaps WHERE beatmap_id = %d' % mapid)
    for d in sql_data:
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
    set_data = c.execute('SELECT beatmapset_id, artist, artist_unicode, title, title_unicode, creator FROM beatmaps WHERE beatmapset_id = %d LIMIT 1' % setid)
    for d in set_data:
        data = {
            'beatmapset_id': d[0],
            "artist": d[1],
            "artist_unicode": d[2],
            "title": d[3],
            "title_unicode": d[4] ,
            "creator": d[5]
        }
    mapids = c.execute('SELECT beatmap_id,version,difficultyrating FROM beatmaps WHERE beatmapset_id = %d ORDER BY difficultyrating' % setid)
    for m in mapids:
        mapid.append([m[0],m[1],m[2]])
    data['mapids']= mapid
    return data

def get_all_users():
    sql_data = c.execute("SELECT user_id, username FROM users")
    user_list = []
    for uid in sql_data:
        user_list.append(uid)
    return user_list

def get_user(user_id=0,username=''):
    sql_data = c.execute(f"SELECT * FROM new_users WHERE user_id={user_id}")
    for d in sql_data:
        user = OsuAPI.get_user(d[3])
    return user

def get_user_old(user_id=0):
    data = {}
    sql_data = c.execute(f"SELECT * FROM users WHERE user_id={user_id}")

    for d in sql_data:
        data['user_id'] = d[0]
        data['username'] = d[1]
        data['country'] = d[2]
    return data

def get_scores(user_id: int):
    data = []
    if user_id == -1:
        sql_data = c.execute(f"SELECT * FROM scores")
    else:
        sql_data = c.execute(f"SELECT * FROM scores WHERE user_id={user_id} ORDER BY date DESC")

    for s in sql_data:
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
            "accuracy": s[14],
            "id": s[15],
        }
        data.append(d)
    return data

def get_ranking():
    data = []
    sql_data = c.execute('''SELECT RANK() OVER(ORDER BY B.rank_score DESC), A.*, B.rank_score, B.SS, B.S, B.A
                    FROM ranking_statistics1 A
                    LEFT JOIN ranking_statistics2 B
                    ON A.user_id = B.user_id''')
    for s in sql_data:
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
    imp_u.append(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    imp_u.append(access_token)
    imp_u.append(refresh_token)

    str_u = str(imp_u)[1:-1]

    c.execute(f"INSERT INTO users (user_id,username,join_date,access_token,refresh_token) \
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

    c.execute(f"INSERT INTO scores (beatmap_id,score,maxcombo,count50,count100,count300,countmiss,countkatu,countgeki,perfect,enabled_mods,user_id,date,rank,accuracy) \
        VALUES ({str_s})")
    conn.commit()
    
    print(f"submit_score uid:{imp_s[11]} b:{imp_s[0]} score:{imp_s[1]} {imp_s[13]} ticks:{imp_s[12]}")

def submit_score_test(score):
    imp_s = list(score.values())
    print(imp_s)
    acc = (int(score['count50'])*50 + int(score['count100'])*100 + int(score['count300'])*300) / ((int(score['count50']) + int(score['count100']) + int(score['count300']) + int(score['countmiss']))*300)
    imp_s.append(float(acc))

    str_s = str(imp_s)[1:-1]

    c.execute(f"INSERT INTO scores_test (beatmap_id,score,maxcombo,count50,count100,count300,countmiss,countkatu,countgeki,perfect,enabled_mods,user_id,date,rank,accuracy) \
        VALUES ({str_s})")
    conn.commit()
    
    print(f"submit_score uid:{imp_s[11]} b:{imp_s[0]} score:{imp_s[1]} {imp_s[13]} ticks:{imp_s[12]}")

# 取玩家圖譜最高分的
# select * from scores where beatmap_id=1482747 and user_id=6008293 order by score desc limit 1

# 圖譜排名
# select * from scores where beatmap_id=1482745 group by user_id order by score desc

# select RANK() OVER(order by score desc) as rank,* from scores where beatmap_id=1482745 group by user_id  
