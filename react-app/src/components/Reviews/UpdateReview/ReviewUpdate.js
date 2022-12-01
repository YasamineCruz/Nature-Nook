import { useState } from "react"
import { useDispatch } from "react-redux"
import { createReview, updateReview } from "../../../store/spot"
import { getSpot } from "../../../store/spot"
import { recommendsCheck } from "../CreateReview"

export default function UpdateReview({reviewInfo, setShowModal}) {
    const [review, setReview] = useState(reviewInfo?.review)
    const [recommends, setRecommends] = useState(reviewInfo.recommends === true ? 'yes' : 'no')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()


const onSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = []
        if(!review) validationErrors.push('Please Enter a review')
        if(!recommends) validationErrors.push('Please recommend')
        let reviewData = {
            review,
            recommends: recommendsCheck(recommends)
        }
        setErrors(validationErrors)
        if(validationErrors.length <= 0) {
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
        <div>
            <form onSubmit={onSubmit}>
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
                onChange={()=> setRecommends('yes')}
                checked={recommends === 'yes'}
                required
                />
                <label>Nah my Guy</label>
                <input
                type='radio'
                name="user-radio" 
                onChange={()=> setRecommends('no')}
                checked={recommends === 'no'}
                /> 
                <button type='submit'>SUBMIT ME</button>
            </form>
        </div>
    )
}