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
        <div>
            <form onSubmit={onSubmit}>
                <label>Review</label>
                <textarea
                onChange={(e)=> setReview(e.target.value)}
                value={review}
                required
                minLength={25}
                maxLength={500}
                cols={40}
                rows={10}
                ></textarea>
                <div>Would you recommend this spot?</div>
                <label>Heck Ye my dude</label>
                <input
                type='radio'
                name="user-radio" 
                onClick={()=> setRecommends('yes')}
                checked={recommends === 'yes'}
                required
                />
                <label>Nah my Guy</label>
                <input
                type='radio'
                name="user-radio" 
                onClick={()=> setRecommends('no')}
                checked={recommends === 'no'}
                /> 
                <button type='submit'>SUBMIT ME</button>
            </form>
            
        </div>
    )
}