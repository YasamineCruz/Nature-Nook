from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review, db
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    """
    Query for a review and update it
    """
   
    review = Review.query.get(id)
  
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        review.review = data['review']
        review.recommends = data['recommends']
        db.session.commit()
        return jsonify(review.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def reviews(id):
    """
    Query for a review and delete it
    """
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify('Review Successfully deleted')



