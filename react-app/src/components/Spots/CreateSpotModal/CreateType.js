import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useEffect } from "react";

export default function CreateTypeComponent({type, setType, setErrors, setCount, count, setSubmitted, errors}) {
    console.log(type)
    useEffect(()=>{
        let validationErrors = []
        if(!type) validationErrors.push('You must select Lodging or Campsite.')
        setErrors(validationErrors)
    },[type, setErrors])

    return (
        <div className='spot-modal-container'>
            <form>
             <label>Type</label>

            <input
            type='checkbox'
            onChange={(e)=> setType(e.target.value)}
            value='lodging'
            checked={type === 'lodging'}
            />
            <input
            type='checkbox'
            onChange={(e)=> setType(e.target.value)}
            value='campsite'
            checked={type === 'campsite'}
            />
   
            </form>
            
            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )

}