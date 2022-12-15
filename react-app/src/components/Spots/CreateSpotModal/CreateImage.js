import { useEffect, useState } from "react"
import NextButton from "./NextButton"
import BackButton from "./BackButton"

export default function CreateImageComponent({ setShowDropdown, setStop, setShowModal, submitted, url, setUrl, setErrors, setCount, count, setSubmitted, errors }) {
    const [checkUrl, setCheckUrl] = useState("");


    useEffect(() => {
        let validationErrors = []
        if (!url || checkUrl === "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png") validationErrors.push("You must enter a valid url");
        setErrors(validationErrors)
    }, [url, checkUrl, setErrors])

    const onError = (e) => {
        setCheckUrl(
            "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png"
        );
        e.target.src =
            "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png";
    };

    return (
        <div className='spot-modal-container'>
            <div className='top-container'>
                <button className='exit-button' type='button' onClick={() => { setShowModal(false); setStop(false); setShowDropdown(false) }}>
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div className='create-modal-progress-bar'>
                    <div className='progress-bar-8'></div>
                    <i class="fa-solid fa-circle-check pro"></i>
                </div>
            </div>
            <form className='create-modal-form'>
                <label className='create-modal-text'>
                    <i className="fa-solid fa-circle circle fa-2xs"></i>
                    Choose a photo for your listing
                </label>
                <input
                    className='create-modal-input'
                    type='text'
                    onChange={(e) => {
                        setCheckUrl(e.target.value);
                        setUrl(e.target.value);
                    }}
                    value={url}
                    placeholder='Enter a photo url'
                    required
                    minLength={1}
                    maxLength={500}
                />
                {url && (
                    <img className='create-modal-img' src={url} alt='' onError={onError} />
                )}
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