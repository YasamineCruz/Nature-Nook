from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    start_date = StringField('start_date', validators=[DataRequired()])
    end_date = StringField('end_date', validators=[DataRequired()])