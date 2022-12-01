import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createReview, getSpot } from '../../../store/spot';
import './CreateReview.css'


export const recommendsCheck = (el) => el === 'yes' ? true : false 

export default function CreateReview({spotId}){
    const [review, setReview] = useState('');
    const [recommends, setRecommends] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
        let validationErrors = []
        if(!review) validationErrors.push('Please Enter a review')
        if(!recommends) validationErrors.push('Please recommend')
        let reviewInfo = {
            review,
            recommends: recommendsCheck(recommends)
        }
        setErrors(validationErrors)
        if(validationErrors.length <= 0) {
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
        }
        }
    }

    return (
        <div className='create-review-wrapper'>
            <label className='add-review-bg-txt'>Add a review</label>
            <form className='create-review-form' onSubmit={onSubmit}>
                <textarea
                className='review-textarea'
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
                    <button className ='add-review-button' type='submit'>Add Review</button>
                </div>
            </form>
            
        </div>
    )
}