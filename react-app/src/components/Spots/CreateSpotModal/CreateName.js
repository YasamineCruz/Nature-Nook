import NextButton from "./NextButton"
import { useEffect } from "react"

export default function CreateNameComponent({setShowDropdown, setStop, setShowModal, submitted, name, setName, setErrors, setCount, count, setSubmitted, errors}) {

    useEffect(()=> {
        let validationErrors = []
        if(name.length < 3 || name.length > 50) validationErrors.push("You must enter a name between 3 and 50 characters.")
        setErrors(validationErrors)
    },[name, setErrors])

    return (
    <div className='spot-modal-container'>
        <div className='top-container'>
            <button className='exit-button' type='button' onClick={()=> { setShowModal(false); setStop(false); setShowDropdown(false)}}>
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div className='create-modal-progress-bar'>
            <div className='progress-bar-1'></div>
            <i class="fa-solid fa-circle-check pro"></i>
        </div>
    </div>
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
        />
        {name.length >= 50 && (
        <div className="create-event-errors">You've reached the max character length. Congrats!</div>
        )}

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
