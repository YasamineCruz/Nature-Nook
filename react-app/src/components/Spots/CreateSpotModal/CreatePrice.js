import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreatePriceComponent(price, setPrice, errors, setErrors, count, setCount) {
    
    useEffect(()=> {
        let validationErrors = [...errors]
        if(!price) validationErrors.push('You must enter a price.')
        setErrors(validationErrors)
        },[price])

    const checkNumber = (e) => {
        if(isNaN(e.target.value)) return false
        return true
    }

    return (
        <div className='spot-price-container'>
            <label>Price:</label>
            <input type='text'
             onKeyPress={checkNumber}
             onChange={(e) => setName(e.target.value)}
             value={price}
             placeholder='[XX]'
             required
             minLength={1}
             maxLength={6}
            />

            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount}/>
            </div>
        </div>
    )  

}