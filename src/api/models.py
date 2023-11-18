from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    places_visited = db.Column(db.ARRAY(db.String), unique=False)
    wishlist_places = db.Column(db.ARRAY(db.String), unique=False)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
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
    media_urls = db.Column(db.ARRAY(db.String), unique=False)
    created_at = db.Column(db.Date)
    modified_at = db.Column(db.Date)

    def __repr__(self):
        return f'<Post {self.place_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "place_name": self.place_name,
            # do not serialize the password, its a security breach
        }







