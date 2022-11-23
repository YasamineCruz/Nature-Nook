import { useEffect, useState } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreateDescriptionComponent(description, setDescription, errors, setErrors, count, setCount) {
    const [length, setLength] = useState(0)

    useEffect(()=> {
        let validationErrors = [...errors]
        if(description.length < 300)  validationErrors.push("You must enter a description between 300 and 500 characters.")
        setErrors(validationErrors)
        },[description])

    return (
        <div className='spot-description-container'>
            <label>Description:</label>
            <input type='textArea'
             onChange={(e) => {
                let val = e.target.value
                setDescription(e.target.value)
                setLength(val.length)
             }}
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
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount}/>
            </div>
        </div>
    )  

}