from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    recommends = BooleanField('recommends')