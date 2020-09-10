# 網頁主程式

from flask import Flask, render_template, jsonify, request, url_for, redirect, abort, session
import OsuAPI
import sql
import mods
from LocalAPI import LocalAPI, users
import datetime
import time
import os

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True      
app.jinja_env.auto_reload = True
app.secret_key = b'840MT'
app.register_blueprint(LocalAPI,url_prefix='/api')


# 網站的首頁
@app.route('/')
def index():
    # count 是簡單統計報名玩家、成績上船的數量
    return render_template('index.html', c=sql.get_count())

@app.route('/rule')
def rule():
    return render_template('rule.html')

# 調試用
@app.route('/test')
def test():
    return jsonify(sql.get_ranking())

# 玩家註冊/報名
@app.route('/register')
@app.route('/login')
def register():
    return redirect(OsuAPI.authorize('login','identify'))

def login(user):
    session.clear()
    session.permanent = True
    session['user_id'] = user['id']
    session['username'] = user['username']
    sql.update_user(user)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

# Oauth回傳用
@app.route('/callback')
def callback():
    if request.args.get('state') == 'login':
        u = OsuAPI.get_token(request.args['code'])
        try:
            user = OsuAPI.get_me(u['access_token'])
        except:
            return redirect(url_for('register'))
        if user['id'] in sql.get_all_users('id'):
            login(user)
            return redirect(url_for('profile',user = user['id']))
        else:
            return render_template('error.html',title='比賽已結束',h1='比賽已結束',context='感謝您的支持，比賽已順利結束!')
            # try:
            #     sql.import_user(user)
            #     login(user)
            #     return redirect(url_for('profile', user = user['id']))
            # except:
            #     return redirect(url_for('register'))
    else:
        return redirect(url_for('index'))

@app.route('/ok')
def ok():
    return "<h1>Ok!</h1>"
    
@app.route('/bad')
def bad():
    return "<h1>No!</h1>"

@app.route('/ranking')
def ranking():
    week = None
    ranking_type = request.args.get('type')
    raw = False

    if 'raw' in request.args:
        raw = True 

    if ranking_type not in ['score', 'ar']:
        return redirect(url_for('ranking',type='score'))

    if request.args.get('week'):
        try:
            week_int = int(request.args.get('week'))
            for w in sql.week:
                if week_int == w[2]:
                    week = w
                    break
        except ValueError:
            week = sql.now_week
        ranking = sql.get_week_ranking(ranking_type == 'ar',week[0],week[1])
    else:
        ranking = sql.get_ranking(ranking_type == 'ar')
    my_rank = None
    if session:
        for rank in ranking:
            if rank['USER_ID'] == session['user_id']:
                my_rank = rank
                break

    if raw:
        return jsonify(
            {'ranking':ranking,
            'my_rank':my_rank,
            'ranking_type':ranking_type,
            'week':week,
            'now_week':sql.now_week})
    else:
        return render_template('ranking.html', ranking=ranking, my_rank=my_rank, type=ranking_type, week=week, now_week=sql.now_week)

@app.route('/players')
def players():
    return render_template('players.html', users=sql.get_all_users())

@app.route('/users/<user>/')
def profile(user):
    if session:
        print(session['username'],end=" - ")
    try:
        user_id = int(user)
    except ValueError:
        user_id = sql.get_userid(user)
        if user_id == None:
            abort(404)
    
    User = sql.get_user(user_id)
    if User == None:
        abort(404)

    scores = sql.get_scores(user_id)
    myfirst = sql.get_myfirst(user_id)
    return render_template('profile.html', scores = scores, user = User, myfirst = myfirst)

@app.route('/maps/')
def maps():
    return render_template('maps.html', maps = sql.get_maps(), c = sql.get_count())

@app.route('/maps/<int:mapid>')
def beatmap(mapid):
    if session:
        print(session['username'],end=" - ")
    beatmap = sql.get_beatmap(mapid)
    mapset = sql.get_beatmapset(beatmap['beatmapset_id'])
    beatmap_ranking = sql.get_beatmap_ranking(mapid)
    return render_template('beatmap.html', mapset=mapset, beatmap=beatmap, ranking=beatmap_ranking)

def takeRANKING_SCORE(elem):
    return elem['RANKING_SCORE']

@app.route('/prize_list')
def prize_list():
    result = {
        'rs1':None,
        'rs2':None,
        'rs3':None,
        'ar1':None,
        'ar2':None,
        'ar3':None,
        'allweekno1':None,
        'ts1':None,
        'fisttimesubmit1':None,
        'no1count1':None,
        'ar100':None,
        'pcand1Mmore1':None,
        'allmappass':None
    }

    ranking = sql.get_ranking()
    rs = sorted(ranking, key=lambda k: k['RANKING_SCORE'], reverse=True)
    ar = sorted(ranking, key=lambda k: k['ACHIEVEMENT_RATE'], reverse=True)

    result['rs1'] = rs[0]
    result['rs2'] = rs[1]
    result['rs3'] = rs[2]

    result['ar1'] = ar[0]
    result['ar2'] = ar[1]
    result['ar3'] = ar[2]

    result['allweekno1'] = ""
    result['ts1'] = ""


    return jsonify(result)

# 錯誤回應
@app.errorhandler(404)
def page_not_found(error):
    return render_template('error.html',h1='找不到',context=error), 404

@app.errorhandler(500)
def special_exception_handler(error):
    return render_template('error.html',h1='伺服器錯誤',context=error), 500

@app.errorhandler(400)
def bad_request(error):
    return render_template('error.html',h1='請求錯誤',context=error), 400

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

if __name__ == '__main__':
    app.run(debug=True)