import { useDispatch } from "react-redux"
import { deleteReview } from "../../../store/spot"
import './DeleteReview.css'

export default function DeleteReview({reviewId, spotId}){
    const dispatch = useDispatch()

    const deleteAReview = () => {
        dispatch(deleteReview(reviewId, spotId))
    }

    return (
        <div>
            <button className='delete-review-button' type='submit' onClick={deleteAReview}>Delete Review</button>
        </div>
    )
}