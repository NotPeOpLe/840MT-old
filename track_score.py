from OsuAPI import get_user_recent
from time import sleep, strptime, mktime
import ddwda
import requests
import logging as l

l.basicConfig(
    format='(%(asctime)s) [%(levelname)s]: %(message)s',
    level=l.DEBUG,
    datefmt='%Y-%m-%d %H:%M:%S'
)

beatmap_list = ddwda.get_beatmaps_list()
l.info('載入 {} 張圖譜'.format(len(beatmap_list)))

def check_score(user_id, score, sql_scores):
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
    users = ddwda.get_all_users()

    for user in users:
        l.info('讀取 {} 的遊玩紀錄'.format(user[1]))
        sql_scores = ddwda.get_scores(user[0])
        try:
            scores = get_recent(user[0])
        except Exception as e:
            pass
        for score in scores:
            if check_score(user[0], score, sql_scores):
                ddwda.submit_score(score)
        sleep(0.5)

ddwda.close()