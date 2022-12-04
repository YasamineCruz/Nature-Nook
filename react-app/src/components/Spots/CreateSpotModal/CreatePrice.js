import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreatePriceComponent({setShowDropdown, setStop, setShowModal, submitted, price, setPrice, setErrors, setCount, count, setSubmitted, errors}) {
 
    useEffect(()=> {
        let validationErrors = []
        if(!price) validationErrors.push('You must enter a price.')
        setErrors(validationErrors)
        },[price, setErrors])


    return (
        <div className='spot-modal-container'>
            <div className='top-container'>
                <button className='exit-button' type='button' onClick={()=> { setShowModal(false); setStop(false); setShowDropdown(false)}}>
                <i class="fa-solid fa-xmark"></i>
                </button>
                <div className='create-modal-progress-bar'>
                    <div className='progress-bar-3'></div>
                    <i class="fa-solid fa-circle-check pro"></i>
                </div>
            </div>
            <form className='create-modal-form'>
              <div className='little-text'>PRICING DETAILS</div>
             <label className='create-modal-text'>
                <i className="fa-solid fa-circle circle fa-2xs"></i>
                How much will you charge per night?
                </label>
                <div className='extra-text-modal'>We suggest $49. Start with a lower price to attract your first few bookings.</div>   
                <input
                className='create-modal-input' 
                type='text'
                onChange={(e) => {
                    let regex = /^[.0-9\b]+$/
                    let pArr = e.target.value.split("")
                    if(pArr.find(e => e === '$')){
                        let i = pArr.findIndex(e => e === '$')
                        pArr.splice(i,1)
                    }
                    let p = pArr.join("")
                    let testString = p.split('.')
                    let pass = true
                    if(testString.length >= 3) pass = false
                    if(testString[0].length >= 10) pass = false
                    if(testString.length === 2){
                        if(testString[1].length >= 3) pass = false
                    }
                    if(p === '') setPrice(`${p}`)
                    if(regex.test(p) && pass) setPrice(`$${p}`)
                }}
                value={price}
                placeholder='[XX]'
                required
                />
                { errors?.length >= 1 && submitted && (
                    <div className='create-event-errors'>
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                         ))}
                    </div>
                )}
                {price.length > 9 && (
                    <div className="create-event-errors">That's too expensive.</div>
                )}
        
            </form>
            

            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )  

}