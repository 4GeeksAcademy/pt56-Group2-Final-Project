from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(80), unique=False)
    last_name = db.Column(db.String(80), unique=False)
    perm_location = db.Column(db.String(80), unique=False)
    places_visited = db.Column(db.ARRAY(db.String()), unique=False)
    wishlist_places = db.Column(db.ARRAY(db.String()), unique=False)
    reset_token = db.Column(db.String(200))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "permanent_location": self.perm_location,
            "places_visited": self.places_visited,
            "wishlist_places": self.wishlist_places,
            "reset_token": self.reset_token
        }

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()



class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    place_name = db.Column(db.String(200))
    stay = db.Column(db.String(200))
    food_drinks = db.Column(db.String(200))
    activities = db.Column(db.String(200))
    transportation = db.Column(db.String(200))
    tips = db.Column(db.String)
    media = db.Column(db.String)
    created_at = db.Column(db.Date)
    modified_at = db.Column(db.Date)

    def __repr__(self):
        return f'<Post {self.place_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "place_name": self.place_name,
            "stay": self.stay,
            "food_drinks": self.food_drinks,
            "activities": self.activities,
            "transportation": self.transportation,
            "tips": self.tips,
            "media": self.media,
            # do not serialize the password, its a security breach
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post = db.relationship(Post)
    comment = db.Column(db.Text)
    created_at = db.Column(db.Date)

    def __repr__(self):
        return f'<Comment {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "author": self.user_id,
            "comment": self.comment,
            "post_id": self.post_id
            # do not serialize the password, its a security breach
        }

class Friends(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    user = db.relationship("User", foreign_keys=[user_id])
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    friend = db.relationship("User", foreign_keys=[friend_id])

    def __repr__(self):
        return f'<Friends {self.user_id}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "friend_id": self.friend_id
            # do not serialize the password, it's a security breach
        }







