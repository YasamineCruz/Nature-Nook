import BackButton from "./BackButton";
import NextButton from "./NextButton";

import { useEffect } from "react";

export default function CreateLocationComponent({submitted, errors, setCount, count, city, setCity, state, setState, country, setCountry, setErrors, setSubmitted}) {


    useEffect(()=> {
        let validationErrors = []
        if(!city) validationErrors.push('You must enter a city.')
        if(!state) validationErrors.push('You must enter a state.')
        if(!country) validationErrors.push('You must enter a country.')
        setErrors(validationErrors)
        },[city, state, country, setErrors])

    return (
        <div className='spot-modal-container'>
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
                required
                />

                <label className='create-modal-text' >State</label>
                <input
                className='create-modal-input'
                type='text'
                onChange={(e)=> setState(e.target.value)}
                value={state}
                placeholder='Enter a State'
                required
                />

                <label className='create-modal-text'>Country</label>
                <input
                className='create-modal-input'
                type='text'
                onChange={(e)=> setCountry(e.target.value)}
                value={country}
                placeholder='Enter a Country'
                required
                />  
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