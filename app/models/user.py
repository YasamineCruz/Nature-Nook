from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

now = datetime.now()
now_str = now.strftime("%m/%d/%Y")


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    ##put in every model/table
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.String(255), nullable=False, default=now_str)

    spots = db.relationship('Spot', back_populates='user', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='user', cascade="all, delete-orphan")
    user_photos = db.relationship('UserPhoto', back_populates='user', cascade="all, delete-orphan")
    bookings = db.relationship('Booking', back_populates='user', cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, with_spots=False, with_reviews=False, plain=False):
        if plain == True:
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                'firstName': self.first_name,
                'lastName': self.last_name,
                'joinDate': self.created_at,
                'userPhotos': [photo.to_dict() for photo in self.user_photos],
            }
        if with_spots == False and with_reviews == True:
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                'firstName': self.first_name,
                'lastName': self.last_name,
                'joinDate': self.created_at,
                'userPhotos': [photo.to_dict() for photo in self.user_photos],
                'Reviews': [review.to_dict() for review in self.reviews]
            }
        if with_reviews == False and with_spots == True:
            return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'joinDate': self.created_at,
            'userPhotos': [photo.to_dict() for photo in self.user_photos],
            'Spots': [spot.to_dict() for spot in self.spots],
        }
        else:
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                'firstName': self.first_name,
                'lastName': self.last_name,
                'joinDate': self.created_at,
                'userPhotos': [photo.to_dict() for photo in self.user_photos],
                'Spots': [spot.to_dict() for spot in self.spots],
                'Reviews': [review.to_dict() for review in self.reviews],
                'Bookings': [booking.to_dict() for booking in self.bookings]
            }
