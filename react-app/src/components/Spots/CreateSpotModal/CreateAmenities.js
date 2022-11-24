import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useEffect } from "react";

let amenities_list = ['picnic-table', 'trash-cans', 'showers', 'wifi', 'kitchen', 'drinking-water', 'laundry', 'toilet', 'hot-tub', 'campfires-allowed', 'pets-allowed', 'none']

export default function CreateAmenitiesComponent({amenities, setAmenities, setErrors, setCount, count}) {
    console.log(amenities)

    useEffect(()=>{
        let validationErrors = []
        if(!amenities) validationErrors.push('You must select amenities or choose none.')
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
            </form>
            

            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount}/>
            </div>
        </div>
    )
}