from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class SearchForm(FlaskForm):
    search = StringField('search', validators=[DataRequired()])
    field = StringField('field', validators=[DataRequired()])