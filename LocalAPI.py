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

@LocalAPI.route('/users/<int:user_id>/scores')
def users_scores(user_id):
    return jsonify(sql.get_scores(user_id))