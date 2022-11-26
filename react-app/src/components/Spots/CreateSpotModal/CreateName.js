import { useEffect } from "react"
import NextButton from "./NextButton"


export default function CreateNameComponent({name, setName, setErrors, setCount, count, setSubmitted, errors}) {

    useEffect(()=> {
        let validationErrors = []
        if(!name) validationErrors.push("You must enter a name between 3 and 50 characters.")
        setErrors(validationErrors)
        },[name, setErrors])
    

    return (
        <div className='spot-modal-container'>
            <form className='create-modal-form'>
               <label className='create-modal-text'>Name your listing</label>
                <input
                className='create-modal-input' 
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Name'
                required
                minLength={3}
                maxLength={50}
                ></input> 
            </form>
            

            <div className='Button-Container-Create-Spot'>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )  

}