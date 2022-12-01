import { useSelector } from 'react-redux'
import DeleteReview from '../DeleteReview'
import UpdateReviewModal from '../UpdateReview'
import './Review.css'
import fav from '../../../assets/logo/naturenook-favicon.png'

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const newDate = (str) => {
    let strSplit = str.split('/')
    let month = months[`${strSplit[0] - 1}`]
    let day = strSplit[1]
    let year = strSplit[2]
    let date = `${month} ${day}, ${year}`
    return date
} 

export default function Review({reviews}){
    const currentUser = useSelector(state => state.session.user)


    return (
        <div className='review-container'>
            <div className='review-amount'>{reviews?.length} Reviews</div>
            {reviews && (
                <div className='review-wrapper'>
                   {reviews.map(review => {
                    return (
                    <div className='review-info'>
                        <div className='review-top-div'>
                        <div className='fav-and-thumb'>
                            <img className='fav'src={fav} alt=''/>
                            <i class={review.recommends === true ? "fa-solid fa-thumbs-up green-review" : "fa-solid fa-thumbs-down red-review"}></i>
                        </div>
                        <div className='date-recommends-wrapper'>
                            <div className='review-recommends'>
                                <div className='owner-name2'>
                                    {review.user.firstName} {review.user.lastName[0]}.
                                </div>
                                <div className='recommends'>
                                    {review.recommends === true ? ` recommends` : ` Doesn't recommend`}
                                </div>
                            </div> 
                            <div className='date'>{newDate(review.createdAt)}</div>
                        </div>
                        </div>
                        <div className='review'>
                            {review.review}
                        </div>
                        {currentUser.id === review.user.id && (
                            <div className='user-only'>
                            <DeleteReview reviewId={review.id} spotId={review.spotId}/>
                            <UpdateReviewModal review={review}/>
                            </div>
                        )}
                    </div>
                    )}
                )}  
                </div>
            )}
        </div>
    )
}