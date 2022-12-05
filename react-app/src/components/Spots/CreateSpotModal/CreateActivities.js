import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useEffect } from "react";

export const activitiesList = ['Boating', 'Fishing', 'Hiking', 'Climbing', 'Surfing', 'Swimming', 'Horseback', 'Snow', 'Whitewater-rafting', 'Paddling', 'Wind-sports', 'Wildlife-watching']

export default function CreateActivitiesComponent({setShowDropdown, setStop, setShowModal, submitted, activities, setActivities, setErrors, setCount, count, setSubmitted, errors}) {
    


    useEffect(()=>{
        let validationErrors = []
        if(activities.length < 1) validationErrors.push('You must select activities.')
        setErrors(validationErrors)
    },[activities, setErrors])

    return (
        <div className='spot-modal-container'>
            <div className='top-container'>
                <button className='exit-button' type='button' onClick={()=> { setShowModal(false); setStop(false); setShowDropdown(false)}}>
                <i class="fa-solid fa-xmark"></i>
                </button>
             <div className='create-modal-progress-bar'>
                <div className='progress-bar-7'></div>
                <i class="fa-solid fa-circle-check pro"></i>
              </div>
            </div>
            <form className='create-modal-form'>
               <div className='little-text'>ACTIVITIES</div>
               <label className='create-modal-text'>
               <i className="fa-solid fa-circle circle fa-2xs"></i>
               What activities are accessible on or near your property?
                </label>
                <div className='activities-div'>
                { activitiesList.map(activity => (
                    <div className='activity-container'>
                        <input
                        className='activity-checkbox pointer'
                        type='checkbox'
                        checked={activities.find(e => e.toLowerCase() === activity.toLowerCase())}
                        onChange={()=>{
                            let copyActivites = [...activities]
                            console.log(copyActivites)
                            if (copyActivites.find(e => e.toLowerCase() === activity.toLowerCase())) {
                                let i = copyActivites.findIndex(e => e.toLowerCase() === activity.toLowerCase())
                                copyActivites.splice(i, 1)
                            } else {
                                copyActivites.push(activity)
                            }
                            setActivities(copyActivites)
                        }} 
                        />
                        <label className='create-modal-text'>{activity.split("-").join(" ")}</label>
                    </div>
                ))}
                </div>

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