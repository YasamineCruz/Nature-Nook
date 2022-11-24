import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpot } from "../../../store/spot";


export function DeleteSpot({spotId, spot, setShowModal}){
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(deleteSpot(spotId))
        setShowModal(false)
        history.push('/')
    }

    return (
        <div className='delete-container'>
            <form onSubmit={onSubmit}>
                <div>Are you sure you want to delete {spot.name}?</div>

                <div className='button-container'>
                    <button onClick={()=> setShowModal(false)} type='button'>Cancel</button>
                    <button type='submit'>Yes Delete {spot.name}</button>
                </div>
            </form>
        </div>
    )
}