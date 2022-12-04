import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useEffect } from "react";

export const amenitiesList = ['Picnic-table', 'Trash-cans', 'Showers', 'Wifi', 'Kitchen', 'Drinking-water', 'Laundry', 'Toilet', 'Hot-Tub', 'Campfires-allowed', 'Pets-allowed', 'I-have-none-of-these']

export default function CreateAmenitiesComponent({setShowDropdown, setStop, setShowModal, submitted, amenities, setAmenities, setErrors, setCount, count, setSubmitted, errors}) {

    useEffect(()=>{
        let validationErrors = []
        if(amenities.length < 1) validationErrors.push('You must select amenities or choose none.')
        setErrors(validationErrors)
    },[amenities, setErrors])

    return (
        <div className='spot-modal-container'>
            <div className='top-container'>
                <button className='exit-button' type='button' onClick={()=> { setShowModal(false); setStop(false); setShowDropdown(false)}}>
                <i class="fa-solid fa-xmark"></i>
                </button>
                <div className='create-modal-progress-bar'>
                    <div className='progress-bar-6'></div>
                    <i class="fa-solid fa-circle-check pro"></i>
                </div>
            </div>
            <form className='create-modal-form'>
                <label className='create-modal-text'>
                    <i className="fa-solid fa-circle circle fa-2xs"></i>
                    Which amenities are available to NatureNookers?</label>
                    <div className='amenities-button-container'>
                {amenitiesList.map((amenity) => {
                    
                        if(amenity === 'I-have-none-of-these' && amenities.length >= 1 && amenities[0] !== 'I-have-none-of-these') return null
                        return (
                        <button
                            className={amenities.find(e => e.toLowerCase() === amenity.toLowerCase()) ? 'amenity-button-checked' : 'amenity-button'}
                            type='button'
                            onClick={()=>{
                                        let copyAmenities = [...amenities]
                                        if(copyAmenities[0] === 'I-have-none-of-these' && amenity !== 'I-have-none-of-these') copyAmenities = []
                                        if (copyAmenities.find(e => e.toLowerCase() === amenity.toLowerCase())) {
                                            let i = copyAmenities.findIndex(e => e.toLowerCase() === amenity.toLowerCase())
                                            copyAmenities.splice(i, 1)
                                            if(!copyAmenities.length) copyAmenities.push('I-have-none-of-these')
                                        } else {
                                            copyAmenities.push(amenity)
                                        }
                                        setAmenities(copyAmenities)
                                    }} 
                        >{amenities.find(e => e.toLowerCase() === amenity.toLowerCase()) && (
                            <div className='check-container'>
                                <i class="fa-solid fa-check checked"></i>
                                <div className='space'></div>
                            </div>
                        )}
                            {amenity.split('-').join(" ")}</button>
                        
                        )})}
                        </div>
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