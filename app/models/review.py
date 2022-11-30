from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

now = datetime.now()
now_str = now.strftime("%m/%d/%Y")


class Review(db.Model):
    __tablename__ = 'reviews'

    ##put in every model/table
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    recommends = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.String(255), nullable=False, default=now_str)
    

    ## relationship
    spot = db.relationship('Spot', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    def to_dict(self):
      return {
         'id': self.id,
         'spot': self.spot.to_dict(True),
         'user': self.user.to_dict(False, False, True),
         'review': self.review,
         'recommends': self.recommends,
         'createdAt': self.created_at
      }
