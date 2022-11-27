import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreatePriceComponent({submitted, price, setPrice, setErrors, setCount, count, setSubmitted, errors}) {
 
    useEffect(()=> {
        let validationErrors = []
        if(!price) validationErrors.push('You must enter a price.')
        setErrors(validationErrors)
        },[price, setErrors])


    return (
        <div className='spot-modal-container'>
            <form className='create-modal-form'>
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
                    if(p === '') setPrice(`${p}`)
                    if(regex.test(p)) setPrice(`$${p}`)
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
            </form>
            

            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )  

}