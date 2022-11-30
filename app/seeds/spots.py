from app.models import db, Spot, environment, SCHEMA
from faker import Faker

fake = Faker()
import random

name_list = ['Tree', 'House', 'Barn', "Cute", 'Secluded', 'Beautiful', 'Sunrise', 'Lazy', 'Day', 'RiverBend', 'Campground', 'Glamping', 'Sandpiper', 'Site', 'Columbia', 'View', 'Shaded', 'Private', 'Camp', 'Alpacas', 'Road', 'Sun', 'To', 'Cabin', 'Peaceful', 'Harvest', 'Devils', 'Lake', 'Moonlight']
state_list = ['OR', 'WA', 'MD', 'VA', 'WA', 'OH', 'ID', 'TX', 'CA', 'AR', 'NV', 'MI', 'AL', 'KA', 'TN', 'HI', 'NM', 'FL', 'UT']
amenities_list = ['Picnic-table', 'Trash-cans', 'Showers', 'Wifi', 'Kitchen', 'Drinking-water', 'Laundry', 'Toilet', 'Hot-Tub', 'Campfires-allowed', 'Pets-allowed', 'I-have-none-of-these']
type_list = ['campsite', 'lodging']
activities_list = ['Boating', 'Fishing', 'Hiking', 'Climbing', 'Surfing', 'Swimming', 'Horseback', 'Snow', 'Whitewater-paddling', 'Paddling', 'Wind-sports', 'Wildlife-watching']
amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), 
type=fake.word(ext_word_list=type_list)

spots = [ 
     Spot(owner_id=1, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)), 
     Spot(owner_id=1, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=1, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=1, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=1, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=2, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=2, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=2, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=3, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=3, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=3, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)), 
     Spot(owner_id=4, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=4, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=4, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=5, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=5, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=5, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=5, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=6, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=7, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=7, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=8, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=8, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=8, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)), 
     Spot(owner_id=9, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=9, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=10, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)), 
     Spot(owner_id=10, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=11, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=11, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=12, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=12, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=12, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=13, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=13, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=14, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=14, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=14, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=15, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=17, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=17, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=17, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=18, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=19, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=19, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=19, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=21, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=21, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=21, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=22, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=23, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
     Spot(owner_id=23, name=fake.sentence(nb_words=3, ext_word_list=name_list), description=fake.paragraph(nb_sentences=10, variable_nb_sentences=False), price=round(random.uniform(1,100), 2), city=fake.city(), state=fake.word(ext_word_list=state_list), country='United States', amenities=fake.sentence(nb_words=5, ext_word_list=amenities_list), type=fake.word(ext_word_list=type_list), activities=fake.sentence(nb_words=5, ext_word_list=activities_list)),
]


# Adds a demo user, you can add other users here if you want
def seed_spots():
  
    db.session.add_all(spots)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM spots")
        
    db.session.commit()