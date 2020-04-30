from api import get_user_recent
from time import sleep, strptime, mktime
import requests

player_list = []
beatmap_list = requests.get('http://127.0.0.1/api/beatmaplist').json()

def check_score(user_id,score,sql_scores):
    if int(score['beatmap_id']) in beatmap_list:
        if score['rank'] != 'F':
            for sql_date in sql_scores:
                if sql_date['date'] == score['date']:
                    return False
        else:
            return False
        return True
    else: 
        return False

while True:
    users = requests.get('http://127.0.0.1/api/userlist').json()

    if player_list != users:
        player_list = users
        print("user_list {}".format(player_list))

    # print("user_list {}".format(user_list))

    for user_id in users:
        sql_scores = requests.get(f'http://127.0.0.1/api/scores?u={user_id}').json()
        scores = get_user_recent(user_id)
        for score in scores:
            if check_score(user_id,score,sql_scores):
                requests.post('http://127.0.0.1/api/scores',params=score)
        sleep(2)
    
    # print('追蹤完成，10秒後繼續追蹤...')
    sleep(10)
