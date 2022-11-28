import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getSpots } from "../../../store/spot";
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
                    console.log(spot)
                    return (
                    <Link className='spot-wrapper' to={`/spots/${spot.id}`}>
                        <div className='spot-img-container'>
                            <img className='small-spot-img' src={Object.values(spot.Photos)[0]?.url} alt=''/>
                        </div>

                        <div className='spot-info-container'>
                            <div className='name-container'>
                                <div className='name-wrapper'>
                                   <h1 className='spot-name'>{spot.name}</h1>
                                    <i class="fa-solid fa-circle-check ind"></i> 
                                </div>
                                <div className='type-container'>
                                <i class={spot.type === 'lodging' ? "fa-solid fa-house type" : "fa-sharp fa-solid fa-campground type"}></i>
                                </div>
                            </div>
                            <div className='spot-text'>{spot.city} {spot.state} {spot.country}</div>
                            <div className='price-container'>
                                <div className='reviews-info-container'>
                                    <i class="fa-solid fa-thumbs-up green"></i>
                                    100%
                                    <div className='reviews-info'></div>
                                </div>
                                <div className='ind-price'>${spot.price}/night</div>
                            </div>
                        </div> 
                    </Link>
                 )
                })
            )}
        </div>
    )
} 