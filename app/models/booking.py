from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

now = datetime.now()
now_str = now.strftime("%m/%d/%Y")


class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    start_date = db.Column(db.String(255), nullable=False)
    end_date = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.String(255), nullable=False, default=now_str)
    
    spot = db.relationship('Spot', back_populates='bookings')
    user = db.relationship('User', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'spotId': self.spot_id,
            'user': self.user.to_dict(False, False, True),
            'startDate': self.start_date, 
            'endDate': self.end_date,
            'createdAt': self.created_at,
            'spot': self.spot.to_dict(False, False, True, False)
        }