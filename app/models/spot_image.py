from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

now = datetime.now()
now_str = now.strftime("%m/%d/%Y")


class SpotImage(db.Model):
    __tablename__ = 'spot_images'

    ##put in every model/table
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    preview = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.String(255), nullable=False, default=now_str)
    

    ## relationship
    spot = db.relationship('Spot', back_populates='spot_images')


    def to_dict(self):
      return {
         'id': self.id,
         'Spot': self.spot.to_dict(True),
         'url': self.url,
         'preview': self.preview,
         'createdAt': self.created_at
      }
