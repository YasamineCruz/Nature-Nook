from app.models import db, User, environment, SCHEMA
from faker import Faker

fake = Faker()

# Adds a demo username, you can add other users here if you want
def seed_users():
    users = [ 
      User(username='Demo', email='demo@aa.io', password='password', first_name='Cleo', last_name='St Claire'),
      User(username='marnie', email='marnie@aa.io', password='password', first_name='Leo', last_name='Lion'),
      User(username='bobbie', email='bobbie@aa.io', password='password', first_name='Hannah', last_name='Banana'),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
      User(username=fake.profile()['username'], email=fake.email(), password=fake.word(), first_name=fake.first_name(), last_name=fake.last_name()),
    ]

    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()