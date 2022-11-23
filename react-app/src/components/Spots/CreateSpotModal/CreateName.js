import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"
import { useSpotContext } from "../../../context/SpotContext"

export default function CreateNameComponent() {
    const {name, setName, errors, setErrors} = useSpotContext()
    
    useEffect(()=> {
        let validationErrors = []
        if(!name) validationErrors.push("You must enter a name between 3 and 50 characters.")
        setErrors(validationErrors)
        },[name, errors, setErrors])

    return (
        <div className='spot-name-container'>
            <label>Name:</label>
            <input type='text'
             onChange={(e) => setName(e.target.value)}
             value={name}
             placeholder='Name'
             required
             minLength={3}
             maxLength={50}
            />

            <div className='Button-Container-Create-Spot'>
                <NextButton />
            </div>
        </div>
    )  

}