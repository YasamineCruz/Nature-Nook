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
        history.push('/spots')
    }

    return (
        <div className='delete-spot-container'>
            <form className='delete-spot-wrapper' onSubmit={onSubmit}>
                <div className='create-modal-text'>Are you sure you want to delete {spot.name}?</div>

                <div className='Button-Container-Create-Spot add-padding edit-for-delete'>
                    <button className='BackButton' onClick={()=> setShowModal(false)} type='button'>Cancel</button>
                    <button className='NextButton add-margin'type='submit'>Delete</button>
                </div>
            </form>
        </div>
    )
}