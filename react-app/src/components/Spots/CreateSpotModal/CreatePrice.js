import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreatePriceComponent({price, setPrice, setErrors, setCount, count, setSubmitted, errors}) {
 
    useEffect(()=> {
        let validationErrors = []
        if(!price) validationErrors.push('You must enter a price.')
        setErrors(validationErrors)
        },[price, setErrors])


    return (
        <div className='spot-modal-container'>
            <form>
             <label>Price:</label>
                <input 
                type='text'
                onChange={(e) => {
                    let regex = /^[.0-9\b]+$/
                    if(e.target.value === '') setPrice(e.target.value)
                    if(regex.test(e.target.value)) setPrice(e.target.value)
                }}
                value={price}
                placeholder='[XX]'
                required
                />   
            </form>
            

            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )  

}