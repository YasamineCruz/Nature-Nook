import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { checkUrl, getImg } from "../../../component-resources";
import { getSpot, getSpots} from "../../../store/spot";
import DeleteSpotModal from "../DeleteSpot";
import EditSpotModal from "../EditASpot";
import './GetASpot.css'
import add from '../../../assets/logo/add.png'
import fav from '../../../assets/logo/naturenook-favicon.png'
import { amenitiesList } from "../CreateSpotModal/CreateAmenities";
import picnic from '../../../assets/logo/picnic.png'
import laundry from '../../../assets/logo/laundry.png'
import toilet from '../../../assets/logo/toilet.png'
import fire from '../../../assets/logo/fire.png'
import Review from "../../Reviews/Review";
import CreateReview from "../../Reviews/CreateReview";
import AmenityCard from "./AmenitiesCard";
import ActivityCard from "./ActivitiesCard";
import loadingImg from '../../../assets/logo/loading.gif'
import NotFound from "../../NotFound/NotFound";

export const percentage = (reviewsArr) => {
    if(reviewsArr.length <= 0) return 100
    let length = reviewsArr.length
    let count = 0
    reviewsArr.forEach(review => {
        if(review.recommends === true) count++ 
    })
    let percent = (count / length) * 100
    return Number.parseFloat(percent).toFixed(0) 
}



export default function GetASpot({spotCount}){
    const dispatch = useDispatch()
    const params = useParams()
    const { spotId } = params
    const spot = useSelector((state) => state.spot.singleSpot)
    const spots = useSelector((state)=> state.spot.allSpots)
    const user = useSelector((state) => state.session.user)
    const [loading, setLoading] = useState(false)
    
    

    useEffect( () => {
          let timer1 = setTimeout(() => setLoading(true), 2000);
          return () => clearTimeout(timer1);
        },[]);
    
    useEffect(()=>{
            dispatch(getSpots())
            dispatch(getSpot(spotId))
        },[dispatch])
        
    useEffect(() => {
            document.body.classList.add('bg-white');

        return function cleanup() {
            document.body.classList.remove('bg-white');
        }
    }, [])

    let notFound;
    if(Object.values(spots).length >= 1) notFound = checkUrl(spots, spotId)
    if(notFound) return notFound
        
 
    return (
        <div>
             {!loading && (
                <div className='bg-white2'>
                    <img className='loading' src={loadingImg} alt=''/>
                </div>
            )}
            {loading && (
        <div className='a-spot-container'>
            {spot && (
                <div className='a-spot-wrapper'>
                    {spot.Photos && (
                        <div className='a-spot-img-container'>
                          <img className='spot-single-img' src={getImg(spot.Photos)} alt=''/>
                          <div className='add-container' type='button' onClick={() => window.open('https://github.com/YasamineCruz', '_blank')}>
                            <img className='add' src={add} alt=''/> 
                          </div>
                        </div>
                    )}       

                    <div className='a-spot-info-container'>
                        <div className='single-loc-wrapper'>
                            <div className='loc-small-text'>{spot.country}</div>
                            <i class="fa-solid fa-angle-right fa-2xs mar"></i>
                            <div className='loc-small-text'>{spot.state}</div>
                            <i className="fa-solid fa-angle-right fa-2xs mar"></i>
                            <div className='loc-small-text'>{spot.city}</div>
                            <i class={spot.type === 'lodging' ? "fa-solid fa-house type" : "fa-sharp fa-solid fa-campground type"}></i>
                        </div>
                        <div className='spot-name-wrapper'>
                           <h1 className='spot-single-name'>{spot.name}</h1>
                            <i class="fa-solid fa-circle-check check2"></i>  
                        </div>
                        <div className='reviews-info-container-single'>
                            <i class="fa-solid fa-thumbs-up green"></i>
                            { spot?.Reviews && (
                                <div>{percentage(spot?.Reviews)}%</div>
                            )}
                            <div className='reviews-info'>Recommended</div>
                        </div>
                        <div className='bottom-container-single'>
                            <div className='owner-info-wrapper'>
                                <img className='default-owner-img' src={fav} alt=''/>
                                <div className='owner-info'>
                                    <div className='lil-host'>Hosted by</div>
                                    <div className='owner-name'>
                                        <div className='lil-name'>{spot?.owner?.firstName} </div>
                                        <div className='lil-name'> {spot?.owner?.lastName}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='middle-container'>
                                <p className='spot-single-desc'>{spot.description}</p>
                                <div className='price-single-card'>
                                    <div>${spot.price}</div>
                                    <div className='per-text'>per night (2 guests)</div>
                                </div>
                            </div>
                        </div>
                        {user?.id === spot?.owner?.id && (
                            <div className='user-only-div'>
                                <div className='delete-only'>
                                    <DeleteSpotModal spotId={spotId} spot={spot}/>
                                </div>
                                <div className='edit-only'>
                                    <EditSpotModal spotId={spotId} spot={spot}/>
                                </div>
                            </div>
                        )}
                        <div className='card-holder-container'>
                            <AmenityCard amenitiesList={amenitiesList} spot={spot} laundry={laundry} picnic={picnic} toilet={toilet} fire={fire}/>
                            <ActivityCard spot={spot}/>
                        </div>
                    </div>
                    <Review reviews={spot?.Reviews}/>
                    {user && (
                        <CreateReview spotId={spotId}/>
                    )}
                </div>
            )}
        </div>

            )}
        </div>
    )
}