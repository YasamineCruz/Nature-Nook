from flask.cli import AppGroup
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .spots import seed_spots, undo_spots
from .spot_images import seed_spot_images, undo_spot_images
from .reviews import seed_reviews, undo_reviews
from .user_photos import seed_user_photos, undo_user_photos


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reviews()
        undo_spot_images()
        undo_spots()
        undo_user_photos()
        undo_users()
    seed_users()
    seed_user_photos()
    seed_spots()
    seed_spot_images()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
#testing commit
@seed_commands.command('undo')
def undo():
   undo_reviews()
   undo_spot_images()
   undo_spots()
   undo_user_photos()
   undo_users()
    # Add other undo functions here