import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getImg } from "../../../component-resources";
import { getSpot } from "../../../store/spot";
import DeleteSpotModal from "../DeleteSpot";
import EditSpotModal from "../EditASpot";
import './GetASpot.css'
import add from '../../../assets/logo/add.png'
import fav from '../../../assets/logo/naturenook-favicon.png'
import { amenitiesList } from "../CreateSpotModal/CreateAmenities";


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
                            <i class="fa-solid fa-angle-right fa-2xs mar"></i>
                            <div className='loc-small-text'>{spot.city}</div>
                        </div>
                        <div className='spot-name-wrapper'>
                           <h1 className='spot-single-name'>{spot.name}</h1>
                            <i class="fa-solid fa-circle-check ind check2"></i>  
                        </div>
                        <div className='reviews-info-container-single'>
                            <i class="fa-solid fa-thumbs-up green"></i>
                            100%
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
                            <p className='spot-single-desc'>{spot.description}</p>
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
                                amenity = amenity.split("-").join(" ")
                                if(amenity === 'I have none of these') return null
                                if(amenity === 'Drinking water') {
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                           <i className="fa-sharp fa-solid fa-faucet"></i>
                                            <div className='lil-amenity'> {amenity} </div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Trash cans') {
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i className="fa-solid fa-trash-can"></i>
                                            <div className='lil-amenity'>{amenity}</div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Kitchen') {
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i class="fa-solid fa-utensils"></i>
                                            <div className='lil-amenity'>{amenity}</div>
                                        </div>
                                    )
                                }
                                if(amenity === 'Showers'){
                                    return (
                                        <div className='lil-amenity-wrapper'>
                                            <i class="fa-solid fa-bath"></i>
                                            <div className='lil-amenity'>{amenity}</div>
                                        </div>
                                    )
                                }
                                return (
                                    <div>{amenity}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}