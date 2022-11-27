import { useEffect } from "react"
import NextButton from "./NextButton"


export default function CreateNameComponent({submitted, name, setName, setErrors, setCount, count, setSubmitted, errors}) {

    useEffect(()=> {
        let validationErrors = []
        if(name.length < 3 || name.length > 50) validationErrors.push("You must enter a name between 3 and 50 characters.")
        setErrors(validationErrors)
        },[name, setErrors])
    

    return (
        <div className='spot-modal-container'>
            <form className='create-modal-form'>
               
               <label className='create-modal-text'>
                    <i className="fa-solid fa-circle circle fa-2xs"></i>
                    Name your listing
                </label>
                <div className='extra-text-modal'>A name that describes this specific offering, like Hilltop A-Frame or Riverside RV Spot.</div>
                <input
                className='create-modal-input' 
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='e.g. Pine Forest Yurt'
                required
                minLength={3}
                maxLength={50}
                ></input>

                { errors?.length >= 1 && submitted && (
                    <div className='create-event-errors'>
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                         ))}
                    </div>
                )}
            </form>
            
            <div className='Button-Container-Create-Spot'>
                <div className='empty-space'></div>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )  

}