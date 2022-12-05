from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired

class SpotForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    amenities = StringField('amenities', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    activities = StringField('activities', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])
