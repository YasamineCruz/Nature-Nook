from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Booking, db
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import BookingForm

booking_routes = Blueprint('bookings', __name__)


@booking_routes.route('/current')
@login_required
def user_bookings():
    """
    Get all the current_users bookings and return them in a dictionary.
    """
    bookings = current_user.bookings

    return jsonify({ 'UserBookings': [ booking.to_dict() for booking in bookings ]})



@booking_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_booking(id):
    """
    Query for a booking and edit that booking based on the form.
    """
    booking = Booking.query.get(id)
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
       
        booking.start_date = data['start_date']
        booking.end_date = data['end_date']

        db.session.commit()
        return jsonify(Booking.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@booking_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_booking(id):
    """
    Query for a booking and delete it if it exists
    """
    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()
    return jsonify('Booking succesffuly deleted')