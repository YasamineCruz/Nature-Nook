from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Spot, db, SpotImage, Review
from app.forms import SpotImageForm, SpotForm, ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('/')
def spots():
    """
    Query for all spots by created_at time and return them in a list of dictionaries
    """
    spots = Spot.query.order_by(Spot.created_at.asc()).all()

    return jsonify({ 'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })


@spot_routes.route('/', methods=["POST"])
@login_required
def add_spot():
    """
    Create a new spot and return it in a dictionary
    """
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        print(data)
        
        new_spot = Spot(
            owner_id = current_user.id,
            name = data['name'],
            description = data['description'],
            price = data['price'],
            city = data['city'],
            state = data['state'],
            country = data['country'],
            amenities = data['amenities'],
            type = data['type'],
            activities = data['activities']
        )
        db.session.add(new_spot)
        db.session.flush()
        
        new_spotimage = SpotImage(
            spot_id = new_spot.id,
            url = data['url'],
            preview = True,
        )        
        db.session.add(new_spotimage)
        db.session.commit()
        return jsonify(new_spot.to_dict(False, False, True, True))
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@spot_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_spot(id):
    """
    Query for a spot and edit that spot based on the form.
    """
    spot = Spot.query.get(id)
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        spot.name = data['name']
        spot.description = data['description']
        spot.price = data['price']
        spot.city = data['city']
        spot.state = data['state']
        spot.country = data['country']
        spot.amenities = data['amenities']
        spot.type = data['type']
        spot.activities = data['activities']

        spot_image = SpotImage.query.filter(SpotImage.spot_id == id, SpotImage.url == data['url']).first()

        currentImages = SpotImage.query.filter(SpotImage.spot_id == id).all()

        for photo in currentImages:
            photo.preview = False
            db.session.commit()


        if not spot_image:
            new_spotimage = SpotImage(
                spot_id = id,
                url = data['url'],
                preview = True,
            )
            db.session.add(new_spotimage)
            db.session.commit()
            return jsonify(spot.to_dict(False, False, True, True))
        else:
            spot_image.preview = True
            db.session.commit()
            return jsonify(spot.to_dict(False, False, True, True))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@spot_routes.route('/<int:id>')
def spot(id):
    """
    Query for a spot and return it in a dictionary
    """
    spot = Spot.query.get(id)

    return jsonify(spot.to_dict(False, False, True, True))


@spot_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_spot(id):
    """
    Query for a spot and delete it if it exists
    """
    spot = Spot.query.get(id)
    db.session.delete(spot)
    db.session.commit()
    return jsonify('Spot Successfully Deleted')


@spot_routes.route('/<int:spot_id>/images', methods=['POST'])
@login_required
def add_image(spot_id):
    """
    Create an image for a spot or multiple images
    """
    form = SpotImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_image = SpotImage(
            spot_id = spot_id,
            url = data['url'],
            preview = data['preview']
        )
        db.session.add(new_image)
        db.session.commit()
        return jsonify(new_image.to_dict())
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@spot_routes.route('/current')
@login_required
def user_spots():
    """
    Get all the current_users spots and return them in a dictionary.
    """
    spots = current_user.spots

    return jsonify({ 'UserSpots': { spot['id'] : spot.to_dict() for spot in spots} })


@spot_routes.route('/<int:spot_id>/reviews')
def spot_reviews(spot_id):
    """
    Query for as spot and return all of it's reviews
    """

    spot = Spot.query.get(spot_id)
    dic = spot.to_dict(False, False, False, True)
    return jsonify(dic.Reviews)


@spot_routes.route('/<int:spot_id>/reviews', methods=['POST'])
@login_required
def create_review(spot_id):
    """
    Create review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_review = Review(
                            spot_id = spot_id,
                            user_id = current_user.id,
                            review = data['review'],
                            recommends = data['recommends']
                            )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict())


    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


