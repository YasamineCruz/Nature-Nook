import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateReview } from "../../../store/spot"
import { recommendsCheck } from "../CreateReview"

export default function UpdateReview({reviewInfo, setShowModal}) {
    const [review, setReview] = useState(reviewInfo.review);
    const [recommends, setRecommends] = useState(reviewInfo.recommends ? 'yes' : 'no');
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
    let validationErrors = []
    if(!review || review.length < 15) validationErrors.push('You must enter a review between 15 and 500 characters')
    if(!recommends) validationErrors.push('Please recommend')
    setErrors(validationErrors)
    },[review, recommends])

    const onSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = []
        setSubmitted(true)
        let reviewData = {
                        review,
                        recommends: recommendsCheck(recommends)
        }
        
        if(errors.length <= 0) {
            dispatch(updateReview(reviewData, reviewInfo.id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                validationErrors.push(data.errors)
            };
            setErrors(validationErrors)
            });
            if(validationErrors.length <= 0){
            setShowModal(false)
            setReview("")
            setRecommends("")
            }
        }
    }

    return (
        
        <div className='update-review-container'>
        <div className='add-review-bg-txt edit-review'>Edit your review</div>
        {errors && submitted && (
          <div className='review-error'>
             {errors.map((error, ind) => (
               <div  id='rev-error' className='signup-error' key={ind}>{error}</div>
             ))}
          </div>
          )}
            <form className='edit-review-form' onSubmit={onSubmit}>
                <textarea
                className={submitted && errors.length >= 1 ? 'review-text-area' : 'review-textarea add-margin-review'}
                onChange={(e)=> setReview(e.target.value)}
                value={review}
                required
                minLength="25"
                maxLength={500}
                cols={60}
                rows={10}
                ></textarea>
                <div className='radio-container'>
                    <div className='radio-text'>Would you recommend this spot?</div>
                    <label className='review-radio-label'>Yes
                    <input
                    className='review-radio'
                    type='radio'
                    name="user-radio" 
                    onClick={()=> setRecommends('yes')}
                    checked={recommends === 'yes'}
                    required
                    />
                    </label>
                    <label className='review-radio-label'>No
                    <input
                    className='review-radio'
                    type='radio'
                    name="user-radio" 
                    onClick={()=> setRecommends('no')}
                    checked={recommends === 'no'}
                    /> 
                    </label>
                </div>
                <div className='button-wrapper'>
                    <button className ='add-review-button' type='submit'>Edit Review</button>
                </div>
            </form>
        </div>
    )
}