from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Spot, db, SpotImage
from app.forms import SpotForm, SpotImageForm
from app.api.auth_routes import validation_errors_to_error_messages

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('/')
def spots():
    """
    Query for all spots by created_at time and return them in a list of dictionaries
    """
    spots = Spot.query.order_by(Spot.created_at.desc()).all
    
    return jsonify({'Spots': [spot.to_dict(False, False, True, True) for spot in spots]})

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


@spot_routes.route('/<int:id>')
def spot(id):
    """
    Query for a spot and return it in a dictionary
    """
    spot = Spot.query.get(id)

    return jsonify(spot.to_dict(False, False, True, True))

@spot_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_spot(id):
    """
    Query for a spot and edit that spot based on the form.
    """
    spot = Spot.query.get(id)
    form = SpotForm()

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

        spot_image = SpotImage.query.filter(SpotImage.id == id and SpotImage.url == data['url']).first()
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

