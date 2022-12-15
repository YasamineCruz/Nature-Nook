import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useEffect } from "react";

export default function CreateTypeComponent({ setShowDropdown, setStop, setShowModal, submitted, type, setType, setErrors, setCount, count, setSubmitted, errors }) {

    useEffect(() => {
        let validationErrors = []
        if (!type) validationErrors.push('You must select Lodging or Campsite.')
        setErrors(validationErrors)
    }, [type, setErrors])

    return (
        <div className='spot-modal-container'>
            <div className='top-container'>
                <button className='exit-button' type='button' onClick={() => { setShowModal(false); setStop(false); setShowDropdown(false) }}>
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div className='create-modal-progress-bar'>
                    <div className='progress-bar-5'></div>
                    <i class="fa-solid fa-circle-check pro"></i>
                </div>
            </div>
            <form className='create-modal-form'>
                <label className='create-modal-text'>
                    <i className="fa-solid fa-circle circle fa-2xs"></i>
                    What kind of space do you have for NatureNookers?</label>
                <div className='extra-text-modal'>Want to offer more than one? Great! Choose which one to set up first.</div>
                <div className='radio-div'>
                    <input
                        className='create-modal-radio pointer'
                        type='radio'
                        onChange={(e) => setType(e.target.value)}
                        value='lodging'
                        checked={type === 'lodging'}
                    />
                    <label className='create-modal-text-smaller'>Lodging</label>
                </div>
                <div className='radio-div'>
                    <input
                        className='create-modal-radio pointer'
                        type='radio'
                        onChange={(e) => setType(e.target.value)}
                        value='campsite'
                        checked={type === 'campsite'}
                    />
                    <label className='create-modal-text-smaller'>Campsite</label>
                </div>

                {errors?.length >= 1 && submitted && (
                    <div className='create-event-errors'>
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                        ))}
                    </div>
                )}
            </form>



            <div className='Button-Container-Create-Spot'>
                <BackButton count={count} setCount={setCount} />
                <NextButton count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors} />
            </div>
        </div>
    )

}