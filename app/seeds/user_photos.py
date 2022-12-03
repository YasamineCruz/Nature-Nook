from app.models import db, UserPhoto, environment, SCHEMA

# Adds a demo username, you can add other users here if you want
def seed_user_photos():
    user_photos = [ 
      UserPhoto(user_id=1, url='https://toppng.com/uploads/preview/crown-icon-transparent-115495360711ic1xegtew.png'),
      UserPhoto(user_id=2, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=3, url='https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      UserPhoto(user_id=4, url='https://cdn-icons-png.flaticon.com/512/219/219986.png'),
      UserPhoto(user_id=5, url='https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      UserPhoto(user_id=6, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=7, url='https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      UserPhoto(user_id=8, url='https://cdn-icons-png.flaticon.com/512/219/219989.png'),
      UserPhoto(user_id=9, url='https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      UserPhoto(user_id=10, url='https://cdn-icons-png.flaticon.com/512/3003/3003035.png'),
      UserPhoto(user_id=11, url='https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      UserPhoto(user_id=12, url='https://cdn-icons-png.flaticon.com/512/219/219986.png'),
      UserPhoto(user_id=13, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=14, url='https://cdn-icons-png.flaticon.com/512/219/219986.png'),
      UserPhoto(user_id=15, url='https://cdn-icons-png.flaticon.com/512/3003/3003035.png'),
      UserPhoto(user_id=16, url='https://cdn-icons-png.flaticon.com/512/219/219989.png'),
      UserPhoto(user_id=17, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=18, url='https://cdn-icons-png.flaticon.com/512/219/219986.png'),
      UserPhoto(user_id=19, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=20, url='https://cdn-icons-png.flaticon.com/512/219/219986.png'),
      UserPhoto(user_id=21, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=22, url='https://cdn-icons-png.flaticon.com/512/219/219989.png'),
      UserPhoto(user_id=23, url='https://cdn-icons-png.flaticon.com/512/3003/3003035.png'),
      UserPhoto(user_id=24, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=25, url='https://cdn-icons-png.flaticon.com/512/219/219989.png'),
      UserPhoto(user_id=26, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
      UserPhoto(user_id=27, url='https://cdn-icons-png.flaticon.com/512/219/219988.png'),
    ]

    db.session.add_all(user_photos)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_photos")
        
    db.session.commit()