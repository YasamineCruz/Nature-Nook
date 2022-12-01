import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getImg } from "../../../component-resources";
import { getSpot, updateReview } from "../../../store/spot";
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

export default function GetASpot(){
    const dispatch = useDispatch()
    const params = useParams()
    const { spotId } = params
    const spot = useSelector((state) => state.spot.singleSpot)
    const user = useSelector((state) => state.session.user)

    console.log(spot)

    useEffect(()=>{
        dispatch(getSpot(spotId))
    },[dispatch])

    useEffect(() => {
        document.body.classList.add('bg-white');

        return function cleanup() {
            document.body.classList.remove('bg-white');
        }
    }, [])

    
    return (
        <div className='a-spot-container'>
            {spot && (
                <div className='a-spot-wrapper'>
                    {spot.Photos && (
                        <div className='a-spot-img-container'>
                          <img className='spot-single-img' src={getImg(spot.Photos)} alt=''/>
                          <div className='add-container' type='button' onClick={() => window.location.href ='https://github.com/YasamineCruz'}>
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
                        </div>
                        <div className='spot-name-wrapper'>
                           <h1 className='spot-single-name'>{spot.name}</h1>
                            <i class="fa-solid fa-circle-check ind check2"></i>  
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
                        <div className='amenities-card-wrapper'>
                            <div className='big-Amenities'>Amenities</div>
                            {amenitiesList.map(amenity => {
                                let og = amenity
                                let amenities;
                                if(spot.amenities) amenities = spot.amenities.split('.').join(" ").toLowerCase()
                                amenity = amenity.split("-").join(" ")
                                if(amenity === 'I have none of these') return null
                                if(amenity === 'Drinking water') {
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                           <i className={amenities?.includes(og.toLowerCase()) ? "fa-sharp fa-solid fa-faucet icon" : "fa-regular fa-circle-xmark icon"}></i>
                                            <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `Portable water available` : `No Portable water`} </div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Trash cans') {
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-trash-can icon" : "fa-regular fa-circle-xmark icon"}></i>
                                            <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Kitchen') {
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-utensils icon" : "fa-regular fa-circle-xmark icon"}></i>
                                            <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Showers'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-bath icon" : "fa-regular fa-circle-xmark icon"}></i>
                                            <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Picnic table'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                        {amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <img className='icon' src={picnic} alt=''/>
                                                <div className='lil-amenity'>{amenity}</div> 
                                            </div>
                                        )}
                                        {!amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <i className='fa-regular fa-circle-xmark icon'></i>
                                                <div className='lil-amenity'>No {amenity}</div>
                                            </div>
                                        )}
                                        </div>
                                    )
                                }
                                if(amenity === 'Wifi'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                         <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-wifi icon": "fa-regular fa-circle-xmark icon"}></i>
                                         <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Laundry'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                        {amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <img className='icon' src={laundry} alt=''/>
                                                <div className='lil-amenity'>{amenity}</div> 
                                            </div>
                                        )}
                                        {!amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <i className='fa-regular fa-circle-xmark icon'></i>
                                                <div className='lil-amenity'>No {amenity}</div>
                                            </div>
                                        )}
                                        </div>
                                    )
                                }
                                if(amenity === 'Toilet'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                        {amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <img className='icon' src={toilet} alt=''/>
                                                <div className='lil-amenity'>{amenity}</div> 
                                            </div>
                                        )}
                                        {!amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <i className='fa-regular fa-circle-xmark icon'></i>
                                                <div className='lil-amenity'>No {amenity}</div>
                                            </div>
                                        )}
                                        </div>
                                    )
                                }
                                if(amenity === 'Hot Tub'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-hot-tub-person icon": "fa-regular fa-circle-xmark icon"}></i>
                                            <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Campfires allowed'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                        {amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <img className='icon' src={fire} alt=''/>
                                                <div className='lil-amenity'>{amenity}</div> 
                                            </div>
                                        )}
                                        {!amenities?.includes(og.toLowerCase()) && (
                                            <div className='lil-amenity-wrapper no-padding'>
                                                <i className='fa-regular fa-circle-xmark icon'></i>
                                                <div className='lil-amenity'>No {amenity}</div>
                                            </div>
                                        )}
                                        </div>
                                    )
                                }
                                if(amenity === 'Pets allowed'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i class={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-paw": "fa-regular fa-circle-xmark icon"}></i>
                                            <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <Review reviews={spot?.Reviews}/>
                    {user && (
                        <CreateReview spotId={spotId}/>
                    )}
                </div>
            )}
        </div>
    )
}