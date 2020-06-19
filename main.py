# 網頁主程式

from flask import Flask, render_template, jsonify, request, url_for, redirect, abort, session
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
app.secret_key  = 'test'
app.register_blueprint(LocalAPI,url_prefix='/api')


# 網站的首頁
@app.route('/')
def index():
    # count 是簡單統計報名玩家、成績上船的數量
    return render_template('index.html', c=sql.get_count())

# 調試用
@app.route('/test')
def test():
    return jsonify(sql.get_ranking())

# 玩家註冊/報名
@app.route('/register')
@app.route('/login')
def register():
    return redirect(OsuAPI.authorize('login','identify'))

def login(user_id, username):
    session.clear()
    session.permanent = True
    session['user_id'] = user_id
    session['username'] = username

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

# Oauth回傳用
@app.route('/callback')
def callback():
    if request.args['state'] == 'login':
        u = OsuAPI.get_token(request.args['code'])
        user = OsuAPI.get_me(u['access_token'])
        try:
            sql.import_user(user,u['access_token'],u['refresh_token'])
            login(user['id'], user['username'])
            return redirect(url_for('profile', user = user['id']))
        except:
            if user['id'] in sql.get_all_users('id'):
                login(user['id'], user['username'])
                return redirect(url_for('profile',user = user['id']))
            else:
                return redirect(url_for('bad'), 400)
    else:
        abort(400)

@app.route('/ok')
def ok():
    return "<h1>Ok!</h1>"
    
@app.route('/bad')
def bad():
    return "<h1>No!</h1>"

@app.route('/ranking')
def ranking():
    if request.args.get('type') == 'ar':
        ranking = sql.get_ranking(ar=True)
    else:
        ranking = sql.get_ranking()
    my_rank = None
    if session:
        for rank in ranking:
            if rank['user_id'] == session['user_id']:
                my_rank = rank
                break
    else:
        pass
    return render_template('ranking.html', ranking=ranking, my_rank=my_rank)

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
    myfirst = sql.get_myfirst(user_id)
    User = sql.get_user(user_id)
    if User is None:
        try:
            user_id = sql.get_userid(user)
            return redirect(url_for('profile', user = user_id))
        except:
            abort(404)
    else:
        return render_template('profile.html', scores = scores, user = User, myfirst = myfirst)

@app.route('/maps/')
def maps():
    return render_template('maps.html', maps = sql.get_maps(), c = sql.get_count())

@app.route('/maps/<int:mapid>')
def beatmap(mapid):
    if session:
        print('%s有登入' % session['username'])
    else:
        print('沒登入')
    beatmap = sql.get_beatmap(mapid)
    mapset = sql.get_beatmapset(beatmap['beatmapset_id'])
    beatmap_ranking = sql.get_beatmap_ranking(mapid)
    return render_template('beatmap.html', mapset=mapset, beatmap=beatmap, ranking=beatmap_ranking)

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
    app.run(host='0.0.0.0',port=80)