"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Comment, Friends
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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
@jwt_required()
def getPosts():
    current_user_id = get_jwt_identity() 
    posts = Post.query.filter_by(user_id = current_user_id)
    allPosts = list(map(lambda x: x.serialize(), posts))

    return jsonify(allPosts), 200

@api.route('/comments', methods=['GET'])
def getComments():
    comments = Comment.query.all()
    allComments = list(map(lambda x: x.serialize(), comments))

    return jsonify(allComments), 200

@api.route('/signup', methods=['POST'])
def createUser():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    password = request.json.get("password")
    email = request.json.get("email")

    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "email exists"}), 401
    
    user = User(first_name=first_name, last_name=last_name ,password=password, email = email)
    db.session.add(user)
    db.session.commit()
    
    response_body = {
        "msg": "User successfully added "
    }

    return jsonify(response_body), 200


@api.route('/createpost', methods=['POST'])
@jwt_required()
def createPost():
    current_user_id = get_jwt_identity() 

    # try:
    place_name = request.form.get("place_name")
    stay = request.form.get("stay")
    food_drinks = request.form.get("food_drinks")
    activities = request.form.get("activities")
    transportation = request.form.get("transportation")
    tips = request.form.get("tips")
    media=request.files.get('media')
    
    imgbb_response = uploadMediaToImgBB(media)

    # Save URL in the db
    post = Post(
        user_id=current_user_id,
        place_name=place_name,
        stay=stay,
        food_drinks=food_drinks,
        activities=activities,
        transportation=transportation,
        tips=tips,
        media=imgbb_response.get('url')  
    )


    db.session.add(post)
    db.session.commit()

    response_body = {
        "msg": "Post successfully added",
        "post_id": post.id  
    }

    return jsonify(response_body), 201  



def uploadMediaToImgBB(media):
    # Upload media to ImgBB and get the URL
    imgbb_url = "https://api.imgbb.com/1/upload?key=a4164c53da6c55c20d8544a12de89add"
    imgbb_response = requests.post(imgbb_url, files={'image': media})
    return imgbb_response.json().get('data')


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
@jwt_required()
def addFriend():
    current_user_id = get_jwt_identity() 
    #user_id = request.json.get("user_id")
    #friend_id = request.json.get("friend_id")

    #friend = Friends(user_id = user_id, friend_id = friend_id)

    email = request.json.get("email")
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")

    user = User.query.filter_by(email=email, first_name=first_name, last_name=last_name).first()
    if user == None:
        return jsonify({"msg": "user doesn't exist"}), 401

    friend = Friends(user_id = current_user_id, friend_id = user.id)

    db.session.add(friend)
    db.session.commit()

    response_body = {
        "msg": "Friend successfully added "
    }

    return jsonify(response_body), 200

@api.route('/removefriend', methods=['DELETE'])
@jwt_required()
def removeFriend():
    current_user_id = get_jwt_identity()
    #user_id = request.json.get("user_id")
    #friend_id = request.json.get("friend_id")
    name = request.json.get("friend")
    x = name.split()
    friendid = User.query.filter_by(first_name=x[0], last_name = x[1]).first()

    if friendid == None:
        return jsonify({"msg": "user doesn't exist"}), 401

    friend = Friends.query.filter_by(user_id = current_user_id, friend_id = friendid.id).first()

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

#get user's friends
@api.route('/friends', methods=['GET'])
@jwt_required()
def getFriends():
    current_user_id = get_jwt_identity()     
    friends_by_id = Friends.query.filter_by(user_id = current_user_id)
    allFriends = list(map(lambda x :x.serialize(), friends_by_id))
    friends = []
    for pair in allFriends:
        friend = User.query.get(pair['friend_id'])
        friends.append(friend.first_name + " " + friend.last_name)
    return jsonify(friends), 200



#login
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }) ,200

#private route
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()    
    user = User.query.get(current_user_id)

    if user == None:
        response_body = {
            "msg": "Please login to continue"
        }
        return jsonify(response_body)
    
    return jsonify({"id": user.id, "email": user.email, "first_name": user.first_name, "last_name": user.last_name,
            "permanent_location": user.perm_location, "places_visited": user.places_visited, "wishlist_places": user.wishlist_places }), 200

@api.route("/feed", methods=['GET'])
@jwt_required()
def feed():
    current_user_id = get_jwt_identity()
    feed = []       
    user = User.query.get(current_user_id)

    if user == None:
        response_body = {
            "msg": "Please login to continue"
        }
        return jsonify(response_body)
    
    friends = Friends.query.filter_by(user_id = current_user_id)
    allFriends = list(map(lambda x :x.serialize(), friends))
     
    for friend in allFriends:
        post = Post.query.filter_by(user_id = friend['friend_id'])
        
        allPosts = list(map(lambda x :x.serialize(), post))
        for post in allPosts:
            user = User.query.filter_by(id = friend['friend_id']).first()
            post["name"] = user.first_name + " " + user.last_name

        feed += allPosts

    return jsonify(feed), 200

@api.route("/editprofile", methods=['PUT'])
@jwt_required()
def editProfile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    updated_data = request.json
    updated_first_name = updated_data.get('first_name') 
    updated_last_name = updated_data.get('last_name')
    updated_perm_location = updated_data.get('perm_location')
    # updated_places_visited = updated_data.get('places_visited')
    # updated_wishlist_places = updated_data.get('wishlist_places')

    if updated_first_name: user.first_name = updated_first_name
    if updated_last_name: user.last_name = updated_last_name
    if updated_perm_location: user.perm_location = updated_perm_location
    # if updated_places_visited: user.places_visited = updated_places_visited
    # if updated_wishlist_places: user.wishlist_places = updated_wishlist_places
    
    db.session.commit()

    return jsonify({"msg": "profile edited"}), 200

@api.route("/addplaceprofile", methods=['PUT'])
@jwt_required()
def addPlaces():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    new_place = request.json
    new_place_visited =  new_place.get('places_visited')
    new_wishlist_place = new_place.get('wishlist_places')
    
    if new_place_visited:
        if user.places_visited: user.places_visited = user.places_visited + [new_place_visited]
        else: user.places_visited = [new_place_visited]
    if new_wishlist_place:
        if user.wishlist_places: user.wishlist_places = user.wishlist_places + [new_wishlist_place]
        else: user.wishlist_places = [new_wishlist_place]

    db.session.commit()

    return jsonify({"msg": "new place added"}), 200



