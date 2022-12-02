import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getSpots } from "../../../store/spot";
import { percentage } from "../GetASpot/GetASpot";
import './GetAllSpots.css'

export default function GetAllSpots(){
    const dispatch = useDispatch()
    const spots = useSelector((state) => Object.values(state.spot.allSpots))

    useEffect(()=>{
        dispatch(getSpots())
    },[dispatch])

    return (
        <div className='all-spots-container'>
            {spots?.length >= 1 && (
                spots.map(spot => {
                    return (
                    <Link className='spot-wrapper pointer' to={`/spots/${spot.id}`}>
                        <div className='spot-img-container pointer'>
                            <img className='small-spot-img pointer' src={Object.values(spot.Photos)[0]?.url} alt=''/>
                        </div>

                        <div className='spot-info-container pointer'>
                            <div className='name-container pointer'>
                                <div className='name-wrapper pointer'>
                                   <h1 className='spot-name pointer'>{spot.name}</h1>
                                    <i class="fa-solid fa-circle-check ind pointer"></i> 
                                </div>
                                <div className='type-container pointer'>
                                <i class={spot.type === 'lodging pointer' ? "fa-solid fa-house type pointer" : "fa-sharp fa-solid fa-campground type"}></i>
                                </div>
                            </div>
                            <div className='spot-text pointer'>{spot.city} {spot.state} {spot.country}</div>
                            <div className='price-container pointer'>
                                <div className='reviews-info-container pointer'>
                                    <i class="fa-solid fa-thumbs-up green pointer"></i>
                                    {percentage(Object.values(spot?.Reviews))}%
                                </div>
                                <div className='ind-price pointer'>${spot.price}/night</div>
                            </div>
                        </div> 
                    </Link>
                 )
                })
            )}
        </div>
    )
} 