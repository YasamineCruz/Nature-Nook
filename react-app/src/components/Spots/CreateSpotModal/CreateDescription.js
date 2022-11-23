import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"
import { useSpotContext } from "../../../context/SpotContext"

export default function CreateDescriptionComponent() {
    const { description, setDescription, errors, setErrors} = useSpotContext()

    useEffect(()=> {
        let validationErrors = []
        if(description.length < 300)  validationErrors.push("You must enter a description between 300 and 500 characters.")
        setErrors(validationErrors)
        },[description, errors, setErrors])

    return (
        <div className='spot-description-container'>
            <label>Description:</label>
            <input type='textArea'
             onChange={(e) => setDescription(e.target.value)}
             value={description}
             placeholder='Add a Description'
             required
             minLength={3}
             maxLength={50}
            />

            {!description && (
                <div>300 more characters needed</div>
            )}

            {(description.length >= 1 && description.length < 300) && (
                <div>{300 - description?.length} more characters needed</div>
            )}

            <div className='Button-Container-Create-Spot'>
                <BackButton/>
                <NextButton/>
            </div>
        </div>
    )  

}