import { useEffect } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreateDescriptionComponent({setShowDropdown, setStop, setShowModal, submitted, description, setDescription, setErrors, setCount, count, setSubmitted, errors}) {

    useEffect(()=> {
        let validationErrors = []
        if(description.length < 300)  validationErrors.push("You must enter a description between 300 and 500 characters.")
        setErrors(validationErrors)
        },[description, setErrors])

    return (
        <div className='spot-modal-container'>
            <div className='top-container'>
                <button className='exit-button' type='button' onClick={()=> { setShowModal(false); setStop(false); setShowDropdown(false)}}>
                <i class="fa-solid fa-xmark"></i>
                </button>
                <div className='create-modal-progress-bar'>
                    <div className='progress-bar-2'></div>
                    <i class="fa-solid fa-circle-check pro"></i>
                </div>
            </div>
            <form className='create-modal-form'>
                <label className='create-modal-text'>
                <i className="fa-solid fa-circle circle fa-2xs"></i>
                    Describe your listing
                </label>
                <div className='extra-text-modal'>Provide a bit more detail about what NatureNookers can see, do, and expect here.</div>
                <textarea
                className='create-modal-large-input'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='e.g. Pitch your tent in our Redwood grove and have access to your own picnic table and fire ring. This is a 3 minute walk from the main house, and you will have complete privacy...'
                required
                minLength={300}
                maxLength={500}
                cols={20}
                rows={20}
                ></textarea>

                {!description && (
                    <div className='describe-count'>300 more characters needed</div>
                )}

                {(description.length >= 1 && description.length < 300) && (
                    <div className='describe-count'>{300 - description?.length} more characters needed</div>
                )}
                {description.length === 500 && (
                    <div className='describe-count'>Maximum character length has been achieved.</div>
                )}  
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
                <br/>
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            </div>
        </div>
    )  

}