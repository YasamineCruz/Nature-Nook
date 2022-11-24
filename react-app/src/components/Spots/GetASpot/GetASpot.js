import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot } from "../../../store/spot";
import DeleteSpotModal from "../DeleteSpot";
import EditSpotModal from "../EditASpot";


export default function GetASpot(){
    const dispatch = useDispatch()
    const params = useParams()
    const { spotId } = params
    const spot = useSelector((state) => state.spot.singleSpot)
    const user = useSelector((state) => state.session.user)


    useEffect(()=>{
        dispatch(getSpot(spotId))
    },[dispatch])

    return (
        <div className='a-spot-container'>
            {spot && user && (
                <div className='a-spot-wrapper'>
                    <div className='a-spot-img-container'>
                        {spot.Photos && (
                          <img src={spot.Photos[0]?.url}/>  
                        )}       
                    </div>

                    <div className='a-spot-info-container'>
                        <h1>{spot.name}</h1>
                        <p>{spot.description}</p>
                        {user?.id === spot?.owner?.id && (
                            <div>
                            <DeleteSpotModal spotId={spotId} spot={spot}/>
                            <EditSpotModal spotId={spotId} spot={spot}/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}