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
def getUsers():
    users = User.query.all()
    allUsers = list(map(lambda x: x.serialize(), users))

    return jsonify(allUsers), 200

@api.route('/posts', methods=['GET'])
def getPosts():
    posts = Post.query.all()
    allPosts = list(map(lambda x: x.serialize(), posts))

    return jsonify(allPosts), 200

@api.route('/comments', methods=['GET'])
def getComments():
    comments = Comment.query.all()
    allComments = list(map(lambda x: x.serialize(), comments))

    return jsonify(allComments), 200

@api.route('/signup', methods=['POST'])
def createUser():
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")

    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "username exists"}), 401
    
    user = User(username=username, password=password, email = email)
    db.session.add(user)
    db.session.commit()
    
    response_body = {
        "msg": "User successfully added "
    }

    return jsonify(response_body), 200

@api.route('/createpost', methods=['POST'])
def createPost():
    user_id = request.json.get("user_id")
    place_name = request.json.get("place_name")
    stay = request.json.get("stay")
    food_drinks = request.json.get("food_drinks")
    activities = request.json.get("activities")
    transportation = request.json.get("transportation")
    tips = request.json.get("tips")

    post = Post(user_id = user_id, place_name = place_name, stay = stay, food_drinks = food_drinks, activities = activities, transportation = transportation, tips = tips)

    db.session.add(post)
    db.session.commit()
    
    response_body = {
        "msg": "Post successfully added "
    }

    return jsonify(response_body), 200

@api.route('/createcomment', methods=['POST'])
def createComment():
    user_id = request.json.get("user_id")
    post_id = request.json.get("post_id")
    comment = request.json.get("comment")

    comment = Comment(user_id = user_id, post_id = post_id, comment = comment)

    db.session.add(comment)
    db.session.commit()

    response_body = {
        "msg": "Comment successfully added "
    }

    return jsonify(response_body), 200

@api.route('/addfriend', methods=['POST'])
def addFriend(): 
    user_id = request.json.get("user_id")
    friend_id = request.json.get("friend_id")

    friend = Friends(user_id = user_id, friend_id = friend_id)

    db.session.add(friend)
    db.session.commit()

    response_body = {
        "msg": "Friend successfully added "
    }

    return jsonify(response_body), 200

@api.route('/removefriend', methods=['DELETE'])
def removeFriend():
    user_id = request.json.get("user_id")
    friend_id = request.json.get("friend_id")

    friend = Friends.query.filter_by(user_id = user_id, friend_id = friend_id).first()

    db.session.delete(friend)
    db.session.commit()

    response_body = {
        "msg": "Friend successfully deleted "
    }

    return jsonify(response_body), 200

@api.route('/deletecomment', methods=['DELETE'])
def deleteComment():
    id = request.json.get("id")

    comment = Comment.query.filter_by(id = id).first()

    db.session.delete(comment)
    db.session.commit()

    response_body = {
        "msg": "Comment successfully deleted "
    }

    return jsonify(response_body), 200

@api.route('/deletepost', methods=['DELETE'])
def deletePost():
    id = request.json.get("id")

    post = Post.query.filter_by(id = id).first()

    db.session.delete(post)
    db.session.commit()

    response_body = {
        "msg": "Post successfully deleted "
    }

    return jsonify(response_body), 200
