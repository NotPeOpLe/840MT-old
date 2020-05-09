from flask import Blueprint, render_template, request, jsonify
import sql
import OsuAPI

LocalAPI = Blueprint('LocalAPI',__name__) 

@LocalAPI.route('/maps/')
def maps():
    return jsonify(sql.get_beatmaps_list())

@LocalAPI.route('/scores/<int:map_id>/')
def scores(map_id):
    return map_id

@LocalAPI.route('/users/')
def users_all():
    return jsonify(sql.get_all_users())

@LocalAPI.route('/users/<int:user_id>/')
def users(user_id):
    return jsonify(OsuAPI.get_old_user(user_id))

@LocalAPI.route('/users/<int:user_id>/scores', methods=['POST', 'GET'])
def users_scores(user_id):
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
        return jsonify(sql.get_scores(user_id))