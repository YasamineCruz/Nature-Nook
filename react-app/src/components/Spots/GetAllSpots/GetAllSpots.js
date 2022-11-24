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
                    return (
                    <Link className='spot-wrapper' to={`/spots/${spot.id}`}>
                        <div className='spot-img-container'>
                            <img className='small-spot-img' src={Object.values(spot.Photos)[0]?.url} alt=''/>
                        </div>

                        <div className='spot-info-container'>
                            <h1 className='spot-name'>{spot.name}</h1>
                            <p className='spot-text'>{spot.description}</p>
                        </div> 
                    </Link>
                 )
                })
            )}
        </div>
    )
} 