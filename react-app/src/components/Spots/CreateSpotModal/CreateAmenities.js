import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useEffect } from "react";

let amenities_list = ['picnic-table', 'trash-cans', 'showers', 'wifi', 'kitchen', 'drinking-water', 'laundry', 'toilet', 'hot-tub', 'campfires-allowed', 'pets-allowed', 'none']

export default function CreateAmenitiesComponent({submitted, amenities, setAmenities, setErrors, setCount, count, setSubmitted, errors}) {
    console.log(amenities)

    useEffect(()=>{
        let validationErrors = []
        if(amenities.length < 1) validationErrors.push('You must select amenities or choose none.')
        setErrors(validationErrors)
    },[amenities, setErrors])

    return (
        <div className='spot-modal-container'>
            <form>
                <label>Amenities</label>
                {amenities_list.map((amenity) => (
                    <input
                    type='checkbox'
                    checked={amenities.find(e => e.toLowerCase() === amenity.toLowerCase())}
                    onChange={()=>{
                        let copyAmenities = [...amenities]
                        if (copyAmenities.find(e => e.toLowerCase() === amenity.toLowerCase())) {
                            let i = copyAmenities.findIndex(e => e.toLowerCase() === amenity.toLowerCase())
                            copyAmenities.splice(i, 1)
                        } else {
                            copyAmenities.push(amenity)
                        }
                        setAmenities(copyAmenities)
                    }} 
                    />
                ))}
                { errors?.length >= 1 && submitted && (
                    <div className='create-event-errors'>
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                         ))}
                    </div>
                )}
            </form>
            


            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )
}