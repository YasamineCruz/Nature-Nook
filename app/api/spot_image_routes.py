from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import SpotImage, db
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename


spot_image_routes = Blueprint('spot_images', __name__)

@spot_image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    """
    Query for a image and delete it
    """
    image = SpotImage.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return jsonify("Image Successfully delete.")

