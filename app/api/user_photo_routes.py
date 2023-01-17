from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, UserPhoto
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename


user_photo_routes = Blueprint('user_photos', __name__)

@user_photo_routes.route('/', methods=['POST'])
@login_required
def create_user_photo():
    """
    Create a user photo
    """
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
    new_image = UserPhoto(user_id=current_user.id, url=url)

    db.session.add(new_image)
    db.session.commit()
    return {"url": url}


@user_photo_routes.route('/', methods=['PUT'])
def update_user_photo():
    """
    Update a user photo
    """
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
    user_photo = UserPhoto.query.filter(UserPhoto.user_id == current_user.id).first()

    user_photo.url = url

    db.session.commit()
    return {"url": url}

@user_photo_routes.route('/', methods=['DELETE'])
def delete_user_photo():
    user_photo = UserPhoto.query.filter(UserPhoto.user_id == current_user.id).first()

    db.session.delete(user_photo)
    db.session.commit()
    return jsonify('User Photo Successfully Deleted')