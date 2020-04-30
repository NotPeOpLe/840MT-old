# 網頁主程式

from flask import Flask, render_template, jsonify, request, url_for, redirect
import api
import sql

app = Flask(__name__)
app.debug = True
app.secret_key = b'\x00F\xb2\xda\x87\x9dWgi\x88\xa8\xf2\xf0\x12\xa7\x04'

# 網站的首頁
@app.route('/')
def index():
    # count 是簡單統計報名玩家、成績上船的數量
    return render_template('index.html',count=sql.get_count())

# 調試用
@app.route('/test')
def test():
    return 'no'

# API
@app.route('/api/<name>', methods=['POST', 'GET'])
def localapi(name=None):
    
    if name == 'scores': # 分數
        if request.method == 'POST': # 上傳分數
            score = {
                "beatmap_id": request.args['beatmap_id'],
                "score": request.args['score'],
                "maxcombo": request.args['maxcombo'],
                "count50": request.args['count50'],
                "count100": request.args['count100'],
                "count300": request.args['count300'],
                "countmiss": request.args['countmiss'],
                "countkatu": request.args['countkatu'],
                "countgeki": request.args['countgeki'],
                "perfect": request.args['perfect'],
                "enabled_mods": request.args['enabled_mods'],
                "user_id": request.args['user_id'],
                "date": request.args['date'],
                "rank": request.args['rank'],
            }
            sql.submit_score(score)
            sql.submit_score_test(score)
            return score

        elif request.method == 'GET': # 取得分數
            scores = sql.get_scores(int(request.args['u']))
            return jsonify(scores)

    elif name == 'beatmaplist' and request.method == 'GET': # 取得所有圖池Map ID
        return jsonify(sql.get_beatmaps_list())

    elif name == 'userlist' and request.method == 'GET': # 取得所有報名玩家 ID
        return jsonify(sql.get_all_users_id())

    elif name == 'users' and request.method == 'GET': # 取得玩家資訊 (From osu api)
        return jsonify(sql.get_user(request.args['u']))

    return "Nothing..."

# 玩家註冊/報名
@app.route('/register')
def register():
    print(api.authorize('register','users.read'))
    return redirect(api.authorize('register','users.read'))

# Oauth回傳用
@app.route('/callback', methods=['GET'])
def callback():
    u = api.get_token(request.args['code'])
    if request.args['state'] == 'register':
        user = api.get_user(u['access_token'])
        try:
            sql.import_user(user,u['access_token'],u['refresh_token'])
        except Exception:
            return redirect(url_for('bad'))
        finally:
            return redirect(url_for('ok'))

@app.route('/ok')
def ok():
    return "<h1>Ok!</h1>"
    
@app.route('/bad')
def bad():
    return "<h1>No!</h1>"

# 玩家個人頁面
@app.route('/profile/<int:user_id>')
def profile(user_id):
    scores = sql.get_scores(user_id)
    user = sql.get_user_old(user_id)
    return render_template('profile.html', scores=scores, user=user)

# 錯誤回應
@app.errorhandler(404)
def page_not_found(error):
    return "<h1>什麼都沒有啦，哈哈!</h1>", 404

@app.errorhandler(500)
def special_exception_handler(error):
    return '<h1>什麼都沒有啦，哈哈!</h1>', 500

@app.errorhandler(400)
def special_exception_handler(error):
    return 'Bad request', 400

@app.template_filter('acc')
def acc_format(value):
    return format(float(value), '.2%')

if __name__ == '__main__':
    app.run(port=80)