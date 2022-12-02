import { activitiesList } from "../CreateSpotModal/CreateActivities";
import climb from '../../../assets/logo/climb.png'
import surf from '../../../assets/logo/surf.png'
import raft from '../../../assets/logo/raft.png'
import paddle from '../../../assets/logo/paddle.png'

export default function ActivityCard({spot}){
        return (
            <div className='amenities-card-wrapper'>
            <div className='big-Amenities'>Activities</div>
            {activitiesList.map(activity => {
                let og = activity
                let activities;
                if(spot.activities) activities = spot.activities.toLowerCase()
                activity = activity.split("-").join(" ")
                console.log(activities)

                if(activity === 'Boating' && activities?.includes(og.toLowerCase())) {
                    return (
                        <div className='lil-amenity-wrapper'>
                            <i className="fa-solid fa-ship icon"></i>
                            <div className='lil-amenity'> Boating </div>
                        </div>
                    )
                }
                if(activity === 'Fishing' && activities?.includes(og.toLowerCase())) {
                    return (
                        <div className='lil-amenity-wrapper'>
                            <i class="fa-solid fa-fish icon"></i>
                            <div className='lil-amenity'> Fishing </div>
                        </div>
                    )
                }
                if(activity === 'Hiking' && activities?.includes(og.toLowerCase())) {
                    return (
                        <div className='lil-amenity-wrapper'>
                            <i className="fa-solid fa-person-hiking icon"></i>
                            <div className='lil-amenity'>Hiking</div>
                        </div>
                    )
                }
                if(activity === 'Climbing' && activities?.includes(og.toLowerCase())){
                    return (
                        <div className='lil-amenity-wrapper'>
                            <img className='icon' src={climb} alt='climbing'/>
                            <div className='lil-amenity'>Climbing</div>
                        </div>
                    )
                }
                if(activity === 'Surfing' && activities?.includes(og.toLowerCase())){
                    return (
                        <div className='lil-amenity-wrapper'>
                            <img className='icon' src={surf} alt='surfing'/>
                            <div className='lil-amenity'>Surfing</div>
                        </div>
                    )
                }
                if(activity === 'Swimming' && activities?.includes(og.toLowerCase())){
                    return (
                        <div className='lil-amenity-wrapper'>
                            <i className="fa-solid fa-person-swimming icon"></i>
                            <div className='lil-amenity'>Swimming</div>
                        </div>
                    )
                }
                if(activity === 'Horseback' && activities?.includes(og.toLowerCase())){
                    return (
                        <div className='lil-amenity-wrapper'>
                            <i className="fa-solid fa-horse icon"></i>
                            <div className='lil-amenity'>Horseback</div>
                        </div>
                    )
                }
                if(activity === 'Snow' && activities?.includes(og.toLowerCase())){
                    return (
                        <div className='lil-amenity-wrapper'>
                            <i className="fa-solid fa-snowflake icon"></i>
                            <div className='lil-amenity'>Snow</div>
                        </div>
                    )
                }
                if(activity === 'Whitewater rafting' && activities?.includes(og.toLowerCase())){
                    return (
                    <div className='lil-amenity-wrapper'>
                        <img className='icon' src={raft} alt='rafting'/>
                        <div className='lil-amenity'>Whitewater rafting</div>
                    </div>
                    )
                }
                if(activity === 'Paddling' && activities?.includes(og.toLowerCase())){
                    return (
                    <div className='lil-amenity-wrapper'>
                        <img className='icon' src={paddle} alt='paddling'/>
                        <div className='lil-amenity'>Paddling</div>
                    </div>
                    )
                }
                if(activity === 'Wind sports' && activities?.includes(og.toLowerCase())){
                    return (
                    <div className='lil-amenity-wrapper'>
                        <i className="fa-solid fa-wind icon"></i>
                        <div className='lil-amenity'>Wind sports</div>
                    </div>
                    )
                }
                if(activity === 'Wildlife watching' && activities?.includes(og.toLowerCase())){
                    return (
                    <div className='lil-amenity-wrapper'>
                        <i className="fa-solid fa-kiwi-bird icon"></i>
                        <div className='lil-amenity'>Wildlife watching</div>
                    </div>
                    )
                }
            })}
        </div>
        )
}