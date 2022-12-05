import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createReview, getSpot } from '../../../store/spot';
import './CreateReview.css'


export const recommendsCheck = (el) => el === 'yes' ? true : false 

export default function CreateReview({spotId}){
    const [review, setReview] = useState('');
    const [recommends, setRecommends] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch();


    useEffect(()=>{
        let validationErrors = []
        if(!review || review.length < 15) validationErrors.push('You must enter a review between 15 and 500 characters')
        if(!recommends) validationErrors.push('Please recommend')
        setErrors(validationErrors)
        },[review, recommends])

    
    const onSubmit = (e) => {
        e.preventDefault()
        let validationErrors = []
        setSubmitted(true)
        let reviewInfo = {
                        review,
                        recommends: recommendsCheck(recommends)
        }
        if(errors.length <= 0) {
            dispatch(createReview(spotId, reviewInfo))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                validationErrors.push(data.errors)
                };
            setErrors(validationErrors)
            });
            if(validationErrors.length <= 0){
            setReview("")
            setRecommends("")
            setSubmitted(false)
            }
        }
    }
    

    return (
        <div className='create-review-wrapper'>
            <label className='add-review-bg-txt'>Add a review</label>
            {errors && submitted && (
                <div className='review-error'>
                {errors.map((error, ind) => (
                <div id='rev-error' className='signup-error' key={ind}>{error}</div>
                ))}
                </div>
            )}
            <form className='create-review-form' onSubmit={onSubmit}>
                <textarea
                className='review-textarea'
                onChange={(e)=> setReview(e.target.value)}
                value={review}
                required
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
                    <button className ='add-review-button' type='submit'>Add Review</button>
                </div>
            </form>
            
        </div>
    )
}