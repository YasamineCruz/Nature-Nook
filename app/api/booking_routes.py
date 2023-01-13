from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review, db
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint('bookings', __name__)


