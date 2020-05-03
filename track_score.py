from api import get_user_recent
from time import sleep, strptime, mktime
import requests as r
import logging as l

l.basicConfig(
    format='(%(asctime)s) [%(levelname)s]: %(message)s',
    filename='track_score.log',
    filemode='w'
)

player_list = r.get('http://127.0.0.1/api/userlist').json()
l.info('載入{}位玩家'.format(len(player_list)))

beatmap_list = r.get('http://127.0.0.1/api/beatmaplist').json()
l.info('載入{}張圖譜'.format(len(beatmap_list)))

def check_score(user_id,score,sql_scores):
    if int(score['beatmap_id']) in beatmap_list:
        if score['date'] > '2020-05-03 00:00:00':
            for sql_date in sql_scores:
                if sql_date['date'] == score['date']:
                    return False
        return True
    else: 
        return False

while True:
    users = r.get('http://127.0.0.1/api/userlist').json()
    
    if users != player_list:
        new_players = []
        for user in users:
            if user not in player_list:
                new_players.append(user)
                player_list.append(user)
        for user in new_players:
            l.info('新玩家: ', user[1])
    
    for user in users:
        l.info('讀取 {} 的遊玩紀錄')
        sql_scores = r.get(f'http://127.0.0.1/api/scores?u={user[0]}').json()
        try:
            scores = get_user_recent(user[0])
            for score in scores:
                if check_score(user[0],score,sql_scores):
                    r.post('http://127.0.0.1/api/scores',params=score)
        except: 
            l.exception()
        sleep(2)
    
    l.info('追蹤完成，10秒後繼續追蹤...')
    sleep(10)
