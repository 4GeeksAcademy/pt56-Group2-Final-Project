"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Comment, Friends
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    var1 = list(map(lambda x: x.serialize(), users))
    return jsonify(var1)


@api.route('/friends', methods=['GET'])
def get_all_friends():
    all_friend_relationships = Friends.query.all()
    friend_pairs = []
    all_relationships_by_id = list(map(lambda x: x.serialize(), all_friend_relationships))
    for relationship in all_relationships_by_id:
        user = User.query.get(relationship['user_id'])
        friend = User.query.get(relationship['friend_id'])
        friend_pairs.append({user.username:friend.username})
    return friend_pairs

