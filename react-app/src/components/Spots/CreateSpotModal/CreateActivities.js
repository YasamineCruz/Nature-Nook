import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useEffect } from "react";

let activities_list = ['boating', 'fishing', 'hiking', 'climbing', 'surfing', 'swimming', 'horseback', 'snow', 'whitewater-paddling', 'paddling', 'wind-sports', 'wildlife-watching', 'none']

export default function CreateActivitiesComponent({ activities, setActivities, setErrors, setCount, count, setSubmitted, errors}) {
    


    useEffect(()=>{
        let validationErrors = []
        if(activities.length < 1) validationErrors.push('You must select activities or choose none.')
        setErrors(validationErrors)
    },[activities, setErrors])

    return (
        <div className='spot-modal-container'>
            <form>
               <label>Activities</label>
                { activities_list.map(activity => (
                    <input
                    type='checkbox'
                    checked={activities.find(e => e.toLowerCase() === activity.toLowerCase())}
                    onChange={()=>{
                        let copyActivites = [...activities]
                        if (copyActivites.find(e => e.toLowerCase() === activity.toLowerCase())) {
                            let i = copyActivites.findIndex(e => e.toLowerCase() === activity.toLowerCase())
                            copyActivites.splice(i, 1)
                        } else {
                            copyActivites.push(activity)
                        }
                        setActivities(copyActivites)
                    }} 
                    />
                ))}
  
            </form>
           
            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount}/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )
}