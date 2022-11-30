import './Review.css'

export default function Review({reviews}){
    console.log(reviews)
    return (
        <div className='review-container'>
            <div className='review-amount'>{reviews?.length} Reviews</div>
            {reviews && (
                <div className='review-wrapper'>
                   {reviews.map(review => (
                    <div className='review'>{review.review}</div>
                ))}  
                </div>
            )}
        </div>
    )
}