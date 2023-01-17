from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserPhoto(db.Model):
    __tablename__ = 'user_photos'

     ##put in every model/table
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    url = db.Column(db.String(500), nullable=False)

    user = db.relationship('User', back_populates='user_photos')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'url': self.url
        }

