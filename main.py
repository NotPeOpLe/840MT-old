from flask import Flask, render_template, jsonify, request, url_for, redirect
import sqlite3
import api
import sql

app = Flask(__name__)
app.debug = True
app.secret_key = b'\x00F\xb2\xda\x87\x9dWgi\x88\xa8\xf2\xf0\x12\xa7\x04'


@app.route('/')
def index():
    return render_template('index.html',count=sql.get_count())

@app.route('/test')
def test():
    return 'no'

@app.route('/api/<name>', methods=['POST', 'GET'])
def req(name=None):
    if name == 'scores':
        if request.method == 'POST':
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

        elif request.method == 'GET':
            scores = sql.get_scores(int(request.args['u']))
            return jsonify(scores)

    elif name == 'beatmaplist' and request.method == 'GET':
        return jsonify(sql.get_beatmaps_list())

    elif name == 'userlist' and request.method == 'GET':
        return jsonify(sql.get_all_users_id())

    elif name == 'users':
        if request.method == 'GET':
            user = sql.get_user(request.args['u'])
        return jsonify(user)

    return "Nothing..."

@app.route('/register')
def register():
    print(api.authorize('register','users.read'))
    return redirect(api.authorize('register','users.read'))

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

@app.route('/profile/<int:user_id>')
def profile(user_id):
    scores = sql.get_scores(user_id)
    user = sql.get_user_old(user_id)
    return render_template('profile.html', scores=scores, user=user)

@app.errorhandler(404)
def page_not_found(error):
    return "<h1>什麼都沒有啦，哈哈!</h1>", 404

@app.errorhandler(500)
def special_exception_handler(error):
    return '<h1>什麼都沒有啦，哈哈!</h1>', 500

@app.errorhandler(400)
def special_exception_handler(error):
    return 'Bad request', 400

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=80)