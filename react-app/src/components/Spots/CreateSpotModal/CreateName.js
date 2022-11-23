import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreateNameComponent(name, setName, errors, setErrors, count, setCount) {
    
    useEffect(()=> {
        let validationErrors = [...errors]
        if(!name) validationErrors.push("You must enter a name between 3 and 50 characters.")
        setErrors(validationErrors)
        },[name])

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
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount}/>
            </div>
        </div>
    )  

}