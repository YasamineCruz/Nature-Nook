from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

now = datetime.now()
now_str = now.strftime("%m/%d/%Y")

lat_val = 1
lng_val = 1

class Spot(db.Model):
    __tablename__ = 'spots'

    ##put in every model/table
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    amenities = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable = False)
    activities = db.Column(db.String(255), nullable = False)
    lat = db.Column(db.Integer, nullable=False, default=lat_val)
    lng = db.Column(db.Integer, nullable=False, default=lng_val)
    created_at = db.Column(db.String(255), nullable=False, default=now_str)


    ## relationships
    user = db.relationship('User', back_populates='spots')
    spot_images = db.relationship('SpotImage', back_populates='spot', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='spot', cascade="all, delete-orphan")
    bookings = db.relationship('Booking', back_populates='spot', cascade="all, delete-orphan")

    def to_dict(self, plain = False, with_ltlg = False, photos = False, reviews = False):
        if plain == True: 
             return {
                'id': self.id,
                'name': self.name,
                'description': self.description,
                'price': self.price,
                'city': self.city,
                'state': self.state,
                'country': self.country,
                'amenities': self.amenities,
                'type': self.type,
                'activities': self.activities,
                'createdAt': self.created_at
             }
        if with_ltlg == False and photos == True and reviews == True:
            return {
                'id': self.id,
                'owner': self.user.to_dict(False, True),
                'name': self.name,
                'description': self.description,
                'price': self.price,
                'city': self.city,
                'state': self.state,
                'country': self.country,
                'amenities': self.amenities,
                'type': self.type,
                'activities': self.activities,
                'createdAt': self.created_at,
                'Photos': [spot_image.to_dict() for spot_image in self.spot_images],
                'Reviews': [review.to_dict() for review in self.reviews],
                'Bookings': [booking.to_dict() for booking in self.bookings],
            }
        if photos == False and reviews == True:
             return {
                'id': self.id,
                'owner': self.user.to_dict(False, True),
                'name': self.name,
                'description': self.description,
                'price': self.price,
                'city': self.city,
                'state': self.state,
                'country': self.country,
                'amenities': self.amenities,
                'type': self.type,
                'activities': self.activities,
                'createdAt': self.created_at,
                'Reviews': [review.to_dict() for review in self.reviews]
            }
        if reviews == False and photos == True:
              return {
                'id': self.id,
                'owner': self.user.to_dict(False, True),
                'name': self.name,
                'description': self.description,
                'price': self.price,
                'city': self.city,
                'state': self.state,
                'country': self.country,
                'amenities': self.amenities,
                'type': self.type,
                'activities': self.activities,
                'createdAt': self.created_at,
                'Photos': [spot_image.to_dict() for spot_image in self.spot_images],
            }   
        else:
              return {
                'id': self.id,
                'owner': self.user.to_dict(False, True),
                'name': self.name,
                'description': self.description,
                'price': self.price,
                'city': self.city,
                'state': self.state,
                'country': self.country,
                'amenities': self.amenities,
                'type': self.type,
                'activities': self.activities,
                'createdAt': self.created_at,
                'Photos': [spot_image.to_dict() for spot_image in self.spot_images],
                'Reviews': [review.to_dict() for review in self.reviews],
                'lat': self.lat,
                'lng': self.lng
            }