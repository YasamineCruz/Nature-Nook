import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createReview, getSpot } from '../../../store/spot';
import './CreateReview.css'

export default function CreateReview({spotId}){
    const [review, setReview] = useState('');
    const [recommends, setRecommends] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        let validationErrors = []
        if(!review) validationErrors.push('Please Enter a review')
        if(!recommends) validationErrors.push('Please recommend')
        let reviewInfo = {
            review,
            recommends
        }
        setErrors(validationErrors)
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
            dispatch(getSpot(spotId))
        }
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Review</label>
                <input
                type='text'
                onChange={(e)=> setReview(e.target.value)}
                value={review}
                required
                />
                <div>Would you recommend this spot?</div>
                <label>Heck Ye my dude</label>
                <input
                type='radio'
                onClick={()=> setRecommends(true)}
                checked={recommends === true}
                />
                <label>Nah my Guy</label>
                <input
                type='radio'
                onClick={()=> setRecommends(false)}
                checked={recommends === false}
                /> 
                <button type='submit'>SUBMIT ME</button>
            </form>
            
        </div>
    )
}