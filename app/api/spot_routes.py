from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Spot, db, SpotImage, Review
from app.forms import SpotImageForm, SpotForm, ReviewForm, SearchForm, BookingForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('/')
def spots():
    """
    Query for all spots by created_at time and return them in a list of dictionaries
    """
    spots = Spot.query.order_by(Spot.created_at.asc()).all()

    return jsonify({ 'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })


@spot_routes.route('/search', methods=['POST'])
def search():
    """
    Query for spots based on a search word
    """

    form = SearchForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        data = form.data
        field = data['field']
        search = data['search']
        if field == 'name':
            spots = Spot.query.filter(Spot.name.ilike(f"%{search}%")).all()
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })
        if field == 'type':
            spots = Spot.query.filter(Spot.type.ilike(f"%{search}%")).all()
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })
        if field == 'activity':
            spots = Spot.query.filter(Spot.activities.ilike(f"%{search}%")).all()
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })
        if field == 'amenity':
            amenities = search.split(' ')
            spots = Spot.query.filter(Spot.amenities.ilike(f"%{search}%")).all()
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })
        if field == 'city':
            spots = Spot.query.filter(Spot.city.ilike(f"%{search}%")).all()
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })
        if field == 'state':
            spots = Spot.query.filter(Spot.state.ilike(f"%{search}%")).all()
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })
        if field == 'country':
            spots = Spot.query.filter(Spot.country.ilike(f"%{search}%")).all()
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })
        if field == 'price':
            search = int(search)
            spots = Spot.query.filter(Spot.price <= search)
            if not spots:
                return jsonify({})
            return jsonify({'Spots': [ spot.to_dict(False, False, True, True) for spot in spots ] })

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



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
        
        db.session.commit()
        return jsonify(new_spot.to_dict(False, False, True, True))
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@spot_routes.route("/<int:id>/spot_images", methods=["POST"])
@login_required
def upload_image(id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400
 
    image = request.files["image"]
    
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = SpotImage(spot_id=id, url=url, preview=True)

    db.session.add(new_image)
    db.session.commit()
    return {"url": url}


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

        db.session.commit()
        return jsonify(spot.to_dict(False, False, True, True))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@spot_routes.route('/<int:id>/spot_images/<int:img_id>', methods=['POST'])
@login_required
def update_image(id, img_id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
   
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    image = SpotImage.query.get(img_id)
    current_images = SpotImage.query.filter(SpotImage.spot_id == id).all()

    for photo in current_images:
        photo.preview = False
        db.session.commit()

    image.url = url
    image.preview = True
    db.session.commit()
    return {"url": url}
    
    


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

    return jsonify({ 'UserSpots': [ spot.to_dict() for spot in spots ]})


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


@spot_routes.route('/<int:spot_id>/bookings', methods=['GET'])
@login_required
def booking_by_spot(spot_id):
    """
    Get all Bookings by Spot
    """
    spot = Spot.query.get(spot_id)
    dic = spot.to_dict(False, False, False, True)
    return jsonify(dic.Bookings)