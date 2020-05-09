# 網頁主程式

from flask import Flask, render_template, jsonify, request, url_for, redirect
import OsuAPI
import sql
import mods
from LocalAPI import LocalAPI

app = Flask(__name__)
app.debug = True
app.secret_key = b'\x00F\xb2\xda\x87\x9dWgi\x88\xa8\xf2\xf0\x12\xa7\x04'
app.register_blueprint(LocalAPI,url_prefix='/api') 

# 網站的首頁
@app.route('/')
def index():
    # count 是簡單統計報名玩家、成績上船的數量
    return render_template('index.html',count=sql.get_count())

# 調試用
@app.route('/test')
def test():
    return jsonify(sql.get_beatmapset(297558))

# 玩家註冊/報名
@app.route('/register')
def register():
    print(OsuAPI.authorize('register','users.read'))
    return redirect(OsuAPI.authorize('register','users.read'))

# Oauth回傳用
@app.route('/callback', methods=['GET'])
def callback():
    if request.args['error']:
        return redirect(url_for('bad'))
    u = OsuAPI.get_token(request.args['code'])
    if request.args['state'] == 'register':
        user = OsuAPI.get_user(u['access_token'])
        try:
            sql.import_user(user,u['access_token'],u['refresh_token'])
        except:
            return redirect(url_for('bad'))
        else:
            return redirect(url_for('ok'))

@app.route('/ok/')
def ok():
    return "<h1>Ok!</h1>"
    
@app.route('/bad/')
def bad():
    return "<h1>No!</h1>"

@app.route('/ranking/')
def ranking():
    return render_template('ranking.html', ranking=sql.get_ranking())

@app.route('/players/')
def players():
    return render_template('players.html', users=sql.get_all_users())

# 玩家個人頁面
@app.route('/players/<int:user_id>/')
def profile(user_id):
    scores = sql.get_scores(user_id)
    user = sql.get_user_old(user_id)
    return render_template('profile.html', scores=scores, user=user)

@app.route('/maps/')
def maps():
    return render_template('maps.html', maps=sql.get_maps())

@app.route('/maps/<int:mapid>')
def beatmap(mapid):
    beatmap = sql.get_beatmap(mapid)
    mapset = sql.get_beatmapset(beatmap['beatmapset_id'])
    return render_template('beatmap.html', mapset=mapset, beatmap=beatmap)

# 錯誤回應
@app.errorhandler(404)
def page_not_found(error):
    return render_template('error.html',errmsg='你好，我是404!'), 404

@app.errorhandler(500)
def special_exception_handler(error):
    return render_template('error.html',errmsg='你好，我是500!'), 404

@app.errorhandler(400)
def bad_request(error):
    return render_template('error.html',errmsg='你好，我是400!'), 404

# 過濾器
@app.template_filter('acc')
def acc_format(value):
    return format(float(value), '.2%')

@app.template_filter('integer')
def int_format(value):
    return format(int(value), ',')

@app.template_filter('mods')
def mods_format(vaule):
    m = mods.formatMods(vaule)
    return '<img >'


if __name__ == '__main__':
    app.run(port=80)