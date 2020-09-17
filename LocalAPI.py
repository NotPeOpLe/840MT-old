from flask import Blueprint, render_template, request, jsonify, redirect, url_for
import sql
import OsuAPI
import requests as r
import json

LocalAPI = Blueprint('LocalAPI',__name__) 

@LocalAPI.route('/maps/')
def maps():
    return jsonify(sql.get_beatmaps_list())

@LocalAPI.route('/scores/<int:map_id>/')
def scores(map_id):
    return map_id

@LocalAPI.route('/users/')
def users_all():
    t = request.args.get('t')
    return jsonify(sql.get_all_users(t))

@LocalAPI.route('/users/<user>/')
def users(user):
    User = sql.get_user(user)
    if User is None:
        return redirect(url_for('LocalAPI.users', user=nametoid(user)))
    return jsonify(User)

@LocalAPI.route('/users/<user>/<info>')
def users_info(user, info):
    User = sql.get_user(user)
    if User is None:
        return redirect(url_for('LocalAPI.users_info', user=nametoid(user), info=info))

    if info == 'scores':
        return jsonify(sql.get_scores(user))
    elif info == 'myfirst':
        return jsonify(sql.get_myfirst(user))

@LocalAPI.route('/test/')
def test():
    return jsonify("ya")

def nametoid(name):
    try:
        user_id = int(name)
    except ValueError:
        user_id = sql.get_userid(name)
    
    User = sql.get_user(user_id)
    if User is None:
        user_id = sql.get_userid(user_id)
    
    return user_id