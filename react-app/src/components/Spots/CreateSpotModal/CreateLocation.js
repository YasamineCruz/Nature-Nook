import BackButton from "./BackButton";
import NextButton from "./NextButton";

import { useEffect } from "react";

export default function CreateLocationComponent({setCount, count, city, setCity, state, setState, country, setCountry, setErrors}) {


    useEffect(()=> {
        let validationErrors = []
        if(!state) validationErrors.push('You must enter a state.')
        if(!city) validationErrors.push('You must enter a city')
        if(!country) validationErrors.push('YOu must enter a country')
        setErrors(validationErrors)
        },[city, state, country, setErrors])

    return (
        <div className='spot-modal-container'>
            <form>
                <label>City</label>
                <input
                type='text'
                onChange={(e)=> setCity(e.target.value)}
                value={city}
                placeholder='Enter a City'
                required
                />

                <label>State</label>
                <input
                type='text'
                onChange={(e)=> setState(e.target.value)}
                value={state}
                placeholder='Enter a State'
                required
                />

                <label>Country</label>
                <input
                type='text'
                onChange={(e)=> setCountry(e.target.value)}
                value={country}
                placeholder='Enter a Country'
                required
                />  
            </form>
            

        <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount}/>
        </div>
        </div>
    )
}