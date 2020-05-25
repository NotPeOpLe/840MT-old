from flask import Blueprint, render_template, request, jsonify
import sql
import OsuAPI
import requests as r
from bs4 import BeautifulSoup
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
    return jsonify(sql.get_all_users())

@LocalAPI.route('/users/<int:user_id>/')
def users(user_id):
    apinfo = OsuAPI.get_user(user_id)
    apinfo['played_maps'] = str(sql.get_user_old(user_id)['played_maps'])
    return jsonify(apinfo)

@LocalAPI.route('/users/<int:user_id>/scores')
def users_scores(user_id):
    return jsonify(sql.get_scores(user_id))

@LocalAPI.route('/test/')
def test():
    re = r.get('https://osu.ppy.sh/users/6008293')
    soup = BeautifulSoup(re.text, 'html.parser')
    o = json.loads(soup.html.find(id='json-user').string.strip('\n').strip())
    return jsonify(json.loads(o))