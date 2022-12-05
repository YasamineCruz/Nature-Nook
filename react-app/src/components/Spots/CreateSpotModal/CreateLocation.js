ort BackButton from "./BackButton";
import NextButton from "./NextButton";

import { useEffect } from "react";

export default function CreateLocationComponent({setShowDropdown, setStop, setShowModal, submitted, errors, setCount, count, city, setCity, state, setState, country, setCountry, setErrors, setSubmitted}) {

    useEffect(()=> {
        let validationErrors = []
        if(!city) validationErrors.push('You must enter a city.')
        if(!state) validationErrors.push('You must enter a state.')
        if(!country) validationErrors.push('You must enter a country.')
        setErrors(validationErrors)
    },[city, state, country, setErrors])

    return (
    <div className='spot-modal-container'>
        <div className='top-container'>
            <button className='exit-button' type='button' onClick={()=> { setShowModal(false); setStop(false); setShowDropdown(false)}}>
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div className='create-modal-progress-bar'>
                <div className='progress-bar-4'></div>
                <i class="fa-solid fa-circle-check pro"></i>
            </div>
        </div>
        <form className='create-modal-form'>
            <label className='create-modal-text'>
                <i className="fa-solid fa-circle circle fa-2xs"></i>
                Where is your property located?</label>
                <label className='create-modal-text'>City</label>
                <input
                className='create-modal-input'
                type='text'
                onChange={(e)=> setCity(e.target.value)}
                value={city}
                placeholder='Enter a City'
                maxLength={25}
                required
                />

                <label className='create-modal-text' >State</label>
                <input
                className='create-modal-input'
                type='text'
                onChange={(e)=> setState(e.target.value)}
                value={state}
                maxLength={25}
                placeholder='Enter a State'
                required
                />

                <label className='create-modal-text'>Country</label>
                <input
                className='create-modal-input'
                type='text'
                onChange={(e)=> setCountry(e.target.value)}
                value={country}
                maxLength={25}
                placeholder='Enter a Country'
                required
                />
                {city.length >= 25 && (
                <div className="create-event-errors">You've reached the max character length for a city. Congrats!</div>
                )}
                {state.length >= 25 && (
                <div className="create-event-errors">You've reached the max character length for a state. Congrats!</div>
                )}
                {country.length >= 25 && (
                <div className="create-event-errors">You've reached the max character length for a country. Congrats!</div>
                )} 
                { errors?.length >= 1 && submitted && (
                <div className='create-event-errors'>
                {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
                ))}
                </div>
                )}
                <div className='extra-text'>
                    Your privacy is important to us. Your address is only shared with verified Hipcampers who have confirmed bookings with you.
                </div>
        </form>

        <div className='Button-Container-Create-Spot'>
            <BackButton count={count} setCount={setCount}/>
            <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        </div>
    </div>
    )
}