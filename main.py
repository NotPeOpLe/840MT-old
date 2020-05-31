# 網頁主程式

from flask import Flask, render_template, jsonify, request, url_for, redirect, abort
import OsuAPI
import sql
import mods
from LocalAPI import LocalAPI, users
import datetime
import time

app = Flask(__name__)
app.config['ENV'] = 'development'
app.config['TEMPLATES_AUTO_RELOAD'] = True      
app.jinja_env.auto_reload = True
app.debug = True

# app.debug = True
app.secret_key = b'\x00F\xb2\xda\x87\x9dWgi\x88\xa8\xf2\xf0\x12\xa7\x04'
app.register_blueprint(LocalAPI,url_prefix='/api') 

# 網站的首頁
@app.route('/')
def index():
    # count 是簡單統計報名玩家、成績上船的數量
    return render_template('index.html', c=sql.get_count())

# 調試用
@app.route('/test_<A>')
def test(A):
    return jsonify(A)

# 玩家註冊/報名
@app.route('/register')
def register():
    print(OsuAPI.authorize('register','identify'))
    return redirect(OsuAPI.authorize('register','identify'))

# Oauth回傳用
@app.route('/callback', methods=['GET'])
def callback():
    if request.args['state'] == 'register':
        u = OsuAPI.get_token(request.args['code'])
        user = OsuAPI.get_me(u['access_token'])
        try:
            sql.import_user(user,u['access_token'],u['refresh_token'])
        except:
            if user['id'] in sql.get_all_users('id'):
                return redirect(url_for('profile',user = user['id']))
            else:
                return redirect(url_for('bad'))
    else:
        return redirect(url_for('profile',user = user['id']))

@app.route('/ok')
def ok():
    return "<h1>Ok!</h1>"
    
@app.route('/bad')
def bad():
    return "<h1>No!</h1>"

@app.route('/ranking')
def ranking():
    return render_template('ranking.html', ranking=sql.get_ranking())

@app.route('/players')
def players():
    return render_template('players.html', users=sql.get_all_users())

@app.route('/users/<user>/')
def profile(user):
    try:
        user_id = int(user)
    except ValueError:
        user_id = sql.get_userid(user)
    scores = sql.get_scores(user_id)
    User = sql.get_user(user_id)
    if User is None:
        try:
            user_id = sql.get_userid(user)
            return redirect(url_for('profile', user = user_id))
        except:
            abort(404)
    else:
        return render_template('profile.html', scores = scores, user = User)

@app.route('/maps/')
def maps():
    return render_template('maps.html', maps = sql.get_maps(), c = sql.get_count())

@app.route('/maps/<int:mapid>')
def beatmap(mapid):
    beatmap = sql.get_beatmap(mapid)
    mapset = sql.get_beatmapset(beatmap['beatmapset_id'])
    beatmap_ranking = sql.get_beatmap_ranking(mapid)
    return render_template('beatmap.html', mapset=mapset, beatmap=beatmap, ranking=beatmap_ranking)

# 錯誤回應
@app.errorhandler(404)
def page_not_found(error):
    return render_template('error.html',errmsg='你好，我是404!'), 404

@app.errorhandler(500)
def special_exception_handler(error):
    return render_template('error.html',errmsg='你好，我是500!'), 500

@app.errorhandler(400)
def bad_request(error):
    return render_template('error.html',errmsg='你好，我是400!'), 400

# 過濾器
@app.template_filter('acc')
def acc_format(value):
    return format(float(value), '.2%')

@app.template_filter('star')
def diff_format(value):
    return format(float(value), '.3')

@app.template_filter('integer')
def int_format(value):
    return format(int(value), ',')

#date format YYYY-MM-DD HH:MM:SS
@app.template_filter('date')
def calDate(date: str):
    nowTime = datetime.datetime.now()
    s1 = date.split(" ")
    s2 = [s1[0].split("-"),s1[1].split(":")]
    temp = 0
    s = [0]*6

    for i in range(0,2):
        for j in range(0,3):
            s[temp] = int(s2[i][j])
            temp += 1

    datetimeDate = datetime.datetime(s[0],s[1],s[2],s[3],s[4],s[5])

    nowTimeSeconds = time.mktime(nowTime.timetuple())
    datetimeDateSeconds = time.mktime(datetimeDate.timetuple())

    if ((nowTimeSeconds-datetimeDateSeconds)/60/60/24>=1):
        if ((nowTimeSeconds-datetimeDateSeconds)/60/60/24>=2):
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60/24)} days ago"
        else: 
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60/24)} day ago"
    elif ((nowTimeSeconds-datetimeDateSeconds)/60/60>=1):
        if ((nowTimeSeconds-datetimeDateSeconds)/60/60>=2):
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60)} hours ago"
        else: 
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60/60)} hour ago"
    elif ((nowTimeSeconds-datetimeDateSeconds)/60>=1):
        if ((nowTimeSeconds-datetimeDateSeconds)/60>=2):
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60)} mins ago"
        else: 
            return f"{round((nowTimeSeconds-datetimeDateSeconds)/60)} min ago"
    else: 
        return "Less than a min ago"


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)