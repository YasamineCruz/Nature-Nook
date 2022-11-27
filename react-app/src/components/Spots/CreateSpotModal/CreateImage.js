import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreateImageComponent({submitted, url, setUrl, setErrors, setCount, count, setSubmitted, errors}) {

    
    useEffect(()=> {
        let validationErrors = []
        if(!url) validationErrors.push("You must enter a valid url")
        setErrors(validationErrors)
        },[url, setErrors])
    

    return (
        <div className='spot-modal-container'>
            <form>
               <label>Image url:</label>
                <input 
                type='text'
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                placeholder='Enter a url'
                required
                minLength={1}
                maxLength={500}
                ></input> 
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