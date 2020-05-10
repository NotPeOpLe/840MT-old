from OsuAPI import get_user_recent
from time import sleep, strptime, mktime
from sql import get_scores, submit_score, get_all_users, get_beatmaps_list
import requests as r
import logging as l

l.basicConfig(
    format='(%(asctime)s) [%(levelname)s]: %(message)s',
    level=l.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)
l.FileHandler('track_score.log','a','UTF-8')

player_list = get_all_users()
l.info('載入 {} 位玩家'.format(len(player_list)))

beatmap_list = get_beatmaps_list()
l.info('載入 {} 張圖譜'.format(len(beatmap_list)))

def check_score(user_id,score,sql_scores):
    if int(score['beatmap_id']) in beatmap_list:
        if score['date'] > '2020-05-03 00:00:00':
            if score['rank'] == 'F':
                return False
            else:
                for sql_date in sql_scores:
                    if sql_date['date'] == score['date']:
                        return False
        return True
    else: 
        return False

while True:
    users = get_all_users()
    
    if users != player_list:
        new_players = []
        for user in users:
            if user not in player_list:
                new_players.append(user)
                player_list.append(user)
        for user in new_players:
            l.info('新玩家: ', user[1])
    
    for user in users:
        l.info('讀取 {} 的遊玩紀錄'.format(user[1]))
        sql_scores = get_scores(user[0])
        try:
            scores = get_user_recent(user[0])
            for score in scores:
                if check_score(user[0],score,sql_scores):
                    submit_score(score)
        except: 
            l.exception()
        sleep(2)
    
    l.info('追蹤完成，10秒後繼續追蹤...')
    sleep(10)
