import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"
import { useSpotContext } from "../../../context/SpotContext"

export default function CreatePriceComponent() {
    const {price, setPrice, errors, setErrors} = useSpotContext()
    
    useEffect(()=> {
        let validationErrors = []
        if(!price) validationErrors.push('You must enter a price.')
        setErrors(validationErrors)
        },[price, errors, setErrors])

    const checkNumber = (e) => {
        if(isNaN(e.target.value)) return false
        return true
    }

    return (
        <div className='spot-price-container'>
            <label>Price:</label>
            <input type='text'
             onKeyPress={checkNumber}
             onChange={(e) => setPrice(e.target.value)}
             value={price}
             placeholder='[XX]'
             required
             minLength={1}
             maxLength={6}
            />

            <div className='Button-Container-Create-Spot'>
                <BackButton/>
                <NextButton/>
            </div>
        </div>
    )  

}