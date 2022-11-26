import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreateDescriptionComponent({ description, setDescription, setErrors, setCount, count, setSubmitted, errors}) {

    useEffect(()=> {
        let validationErrors = []
        if(description.length < 300)  validationErrors.push("You must enter a description between 300 and 500 characters.")
        setErrors(validationErrors)
        },[description, setErrors])

    return (
        <div className='spot-modal-container'>
            <form>
                <label>Description:</label>
                <input type='textArea'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Add a Description'
                required
                minLength={300}
                maxLength={500}
                />

                {!description && (
                    <div>300 more characters needed</div>
                )}

                {(description.length >= 1 && description.length < 300) && (
                    <div>{300 - description?.length} more characters needed</div>
                )}  
            </form>
            

            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )  

}