from app.models import db, SpotImage, environment, SCHEMA
from faker import Faker

fake = Faker()

url_list = [
        'https://lovehomedesigns.com/wp-content/uploads/2021/12/red-barn-metal-gate-12821.jpg',
        'https://northeastohiofamilyfun.com/wp-content/uploads/2020/05/Campgrounds-in-Ohio.jpg',
        'https://the-riotact.com/wp-content/uploads/2010/10/The-Best-Campgrounds-Near-Canberra.jpg',
        'https://media.timeout.com/images/104022782/image.jpg',
        'https://nationaltoday.com/wp-content/uploads/2022/06/22-Log-Cabin.jpg',
        'https://www.oregonlive.com/resizer/JbZp7qUcYQZFp4mjvD94Oj1rQV0=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/ASQRVBHGKJF4HH756GGENHOT2U.jpg',
        'https://s22657.pcdn.co/wp-content/uploads/2019/12/Wood1.jpg.optimal.jpg',
        'https://a0.muscache.com/im/pictures/934644e8-9084-48f5-bb72-d5eb7d29462e.jpg?im_w=960',
        'https://the-riotact.com/wp-content/uploads/2010/10/The-Best-Campgrounds-Near-Canberra.jpg',
        'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FiaW58ZW58MHx8MHx8&w=1000&q=80',
        'https://www.corradi.eu/getattachment/64557121-e78f-47c4-a464-44de192a9548/types-country-houses.jpg',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/winivan-farm-treehouse-cottage-copy-1559232785.jpg?crop=0.468xw:1.00xh;0.218xw,0&resize=480:*',
        'https://st.hzcdn.com/simgs/pictures/sheds/tjch-barn-tim-jackson-custom-homes-img~58d17fc109139959_14-8494-1-3afd9a5.jpg',
        'https://images.dailyhive.com/20210809085952/shutterstock_1273617199.jpg',
        'https://www.housedigest.com/img/gallery/40-small-cabin-designs-you-can-build-yourself/intro-1636036601.jpg',
        'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2018/06/HEADER2-2.jpg?fit=678%2C381&ssl=1',
        'https://www.impressiveinteriordesign.com/wp-content/uploads/2012/10/Interior-And-Exterior-Country-House-Pictures-9.jpg',
        'https://www.gardentimeinc.com/wp-content/uploads/2021/02/32x36-Monitor-Barn-with-8-overhang-600x338.jpg',
        'https://www.ontarioparks.com/images/headers/carcamping.jpg',
        'https://loveincorporated.blob.core.windows.net/contentimages/main/341ec728-e11a-4fcb-8acc-cf415ae420bc-silver-maple-treehouse.jpg',
        'https://static.designboom.com/wp-content/uploads/2022/08/hello-wood-extraordinary-rock-cabins-resort-hungary-designboom-700-400x320-22b08q85r844.jpg',
        'https://i0.wp.com/nationalland.com/blog/wp-content/uploads/2016/04/Rock_Cabin.jpg?resize=564%2C410&ssl=1',
        'https://images.squarespace-cdn.com/content/v1/5bdb9fc2af209634820bab5c/1547208156829-Y7EOQYR57EUVXGAHCBE3/barn12.jpg?format=1000w',
        'https://www.alapark.com/sites/default/files/styles/default/public/2019-04/CCC%20Primitive%20camping.jpeg?itok=_6Gwos6W',
        'https://media.architecturaldigest.com/photos/6234bf837f2a86c38a7d948d/16:9/w_2560%2Cc_limit/L1330687.jpg',
        'https://hips.hearstapps.com/clv.h-cdn.co/assets/17/19/10-acre-homes-oklahoma-0617.jpg',
        'https://i0.wp.com/files.tripstodiscover.com/files/2019/10/Adults-Only-Treehouse-at-Danville.jpg?resize=784%2C588',
        'https://i0.wp.com/onechelofanadventure.com/wp-content/uploads/2020/10/Leaf-Treehouse.png?fit=526%2C707&ssl=1',
        'https://static.dezeen.com/uploads/2022/08/birdseye-homestead-farmhouse-vermont_sq_dezeen_2364_col_1-411x411.jpg',
        'https://www.nps.gov/shen/planyourvisit/images/20171025_MACG_A-Loop_SNP1199_nl.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
        'https://www.jerseyfamilyfun.com/wp-content/uploads/2020/06/Cabin-rentals-on-the-lake.png',
        'https://thetravel100.com/wp-content/uploads/sites/9/2020/08/sulfur-ridge-luxury-treehouse-featured-photo.jpg',
        'https://images.wideopencountry.com/wp-content/uploads/2017/07/Untitled-design-29-1056x704.png',
        'https://timberhomesllc.com/wp-content/uploads/2018/10/Timber-Frame-Barn-in-Bethel-Vermont-600x375.jpg',
        'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/4/17/0/HUHH2019-Escape_Fall-City-WA_19.jpg.rend.hgtvcom.406.325.suffix/1555507098172.jpeg',
        'https://i0.wp.com/blueridgemountainstravelguide.com/wp-content/uploads/2022/06/Deep-Creek-Campground-in-Bryson-City-NC-1-of-1.jpg?resize=690%2C460&ssl=1',
        'https://www.nps.gov/lacl/planyourvisit/images/LACL-2019-Joe-Thompson-Cabin-Kara-Lewandowski.jpg?maxwidth=1200&autorotate=false',
        'https://images.squarespace-cdn.com/content/v1/5e582c0a21658b02c2b429de/1617674980394-BX0U1WHCEQIK4WLOJA4H/thebarns.jpg',
        'https://www.novascotia.com/sites/default/files/2020-09/Graves-Island-camping-stars.jpg',
        'https://www.venuereport.com/media/cache/resolve/venue_roundup_single_image/uploads/+0Regular_Roundup/Cabins2017/COVER-jessolm-02.jpg',
        'https://i.pinimg.com/736x/26/bc/b3/26bcb3610ea517974554d77d353c34f2--country-life-country-living.jpg',
        'https://cdn.trendhunterstatic.com/thumbs/hechteleksel-tree-house.jpeg?auto=webp',
        'https://loveincorporated.blob.core.windows.net/contentimages/gallery/0a26a6df-a0c2-46b6-89a9-858a2f2c35e7-wyoming-barn-exterior.jpg',
        'https://i0.wp.com/files.tripstodiscover.com/files/2021/09/Acadia-East-Campground.jpg?resize=1200,628',
        'https://www.christiesrealestate.com/blog/wp-content/uploads/2021/12/river-house-estate-telkwa-british-columbia-1.jpg',
        'https://i0.wp.com/nationalland.com/blog/wp-content/uploads/2016/04/Lakeside_cabin.jpg?resize=500%2C553&ssl=1',
        'https://64.media.tumblr.com/93c07c2d08cf0c9c70db0614e5e0660b/tumblr_ob4cs2d1eV1sj2bw4o1_1280.jpg',
        'https://www.mycustombarn.com/wp-content/uploads/2020/02/7737-e-fm-922-valley-view-tx-High-Res-6-1-1-scaled.jpg',
        'https://www.travelalaska.com/sites/default/files/2022-09/PlanYourTrip_Places%20to%20Stay_Camgrounds%20RV%20Parks_%28istockphoto%2C%20pkujiahe%29%20crop%20resize_0.jpg',
        'https://www.boston.com/wp-content/uploads/2021/02/airbnbjacksonnh-6022beb2a2eb2.jpg',
        'https://ichef.bbci.co.uk/images/ic/1200x675/p04qmb0x.jpg'
        ]



# Adds a demo user, you can add other users here if you want
def seed_spot_images():
    i = 0
    while i < 51:
        new_spotimage = SpotImage(
            spot_id = i,
            url = url_list[i],
            preview = True
        )
        db.session.add(new_spotimage)
        db.session.commit()
        i += 1

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_spot_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()