"""create tables

Revision ID: 7e58e6e94229
Revises: 
Create Date: 2023-01-17 11:19:17.323685

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '7e58e6e94229'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    ## Make for every single table
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###

    op.create_table('spots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('state', sa.String(length=255), nullable=False),
    sa.Column('country', sa.String(length=255), nullable=False),
    sa.Column('amenities', sa.String(length=255), nullable=False),
    sa.Column('type', sa.String(length=255), nullable=False),
    sa.Column('activities', sa.String(length=255), nullable=False),
    sa.Column('lat', sa.Integer(), nullable=False),
    sa.Column('lng', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    ## Make for every single table
    if environment == "production":
        op.execute(f"ALTER TABLE spots SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###

    op.create_table('user_photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    ## Make for every single table
    if environment == "production":
        op.execute(f"ALTER TABLE user_photos SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###

    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('spot_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('start_date', sa.String(length=255), nullable=False),
    sa.Column('end_date', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    ## Make for every single table
    if environment == "production":
        op.execute(f"ALTER TABLE bookings SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('spot_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=500), nullable=False),
    sa.Column('recommends', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    ## Make for every single table
    if environment == "production":
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###

    op.create_table('spot_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('spot_id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=500), nullable=False),
    sa.Column('preview', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    ## Make for every single table
    if environment == "production":
        op.execute(f"ALTER TABLE spot_images SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('spot_images')
    op.drop_table('reviews')
    op.drop_table('bookings')
    op.drop_table('user_photos')
    op.drop_table('spots')
    op.drop_table('users')
    # ### end Alembic commands ###
