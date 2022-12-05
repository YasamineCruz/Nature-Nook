from app.models import db, Review, environment, SCHEMA
from faker import Faker

fake = Faker()

import random

reviews = []

for i in range(1,53):
    j = random.randrange(1,16)
    for k in range(1, j):
        reviews.append(Review(spot_id = i, user_id = random.randrange(1, 27), review=fake.text(), recommends=fake.boolean(chance_of_getting_true=75)))


def seed_reviews():
    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
        
    db.session.commit()