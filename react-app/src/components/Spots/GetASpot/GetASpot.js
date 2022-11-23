import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getASpot } from "../../../store/spot";




export default function GetASpot(){
    const dispatch = useDispatch()
    const params = useParams()
    const { spotId } = params
    const spot = useSelector((state) => state.spot.spot)

    useEffect(()=>{
        dispatch(getASpot(spotId))
    },[dispatch])

    return (
        <div className='a-spot-container'>
            {spot && (
                <div className='a-spot-wrapper'>
                    <div className='a-spot-img-container'>
                        <img src={spot.Photos[0]?.url}/>
                    </div>

                    <div className='a-spot-info-container'>
                        <div></div>
                    </div>
                </div>
            )}
        </div>
    )
}