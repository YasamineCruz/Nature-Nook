import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../../store/spot";
import './CreateBooking.css'
import { addZero } from "../../../component-resources";
import ViewDatesModal from "../BookingDates";
import { convertForPythonBackend } from "../BookingDates/BookingDates";
import { useHistory } from "react-router-dom";

export default function CreateBooking({ spotId, spot }) {
    const dispatch = useDispatch();
    const [startDate2, setStartDate2] = useState('');
    const [endDate2, setEndDate2] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.session.user)
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault();
        let errors = [];
        setSubmitted(true)
        setValidationErrors([])

        if(!user){
            errors.push('You must be signed in to create a booking.')
        }

        if(!startDate2){
            errors.push('You must selest a valid start date.')
        }

        if(!endDate2){
            errors.push('You must select a valid end date.')
        }

        setValidationErrors(errors)

        if(errors.length >= 1) return

        const bookingInfo = {
            start_date: convertForPythonBackend(startDate2),
            end_date: convertForPythonBackend(endDate2)
        }

        let response = await dispatch(createBooking(spotId, bookingInfo))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    errors.push(data.errors)
                };
                setValidationErrors(errors)
            })
        if (response.errors) {
            errors.push(response.errors)
            setValidationErrors(errors)
        }
        if (errors.length <= 0) {
            setStartDate2("")
            setEndDate2("")
            setSubmitted(false)
            history.push(`/user/${user.id}`)
        }
    }

    return (
        <div className='price-single-card'>
            <form onSubmit={onSubmit}>
                <div className='price-nightly'>
                    <div>${addZero(spot.price)}</div>
                    <div className='per-text'>per night (2 guests)</div>
                </div>
                <div className='date-holder'>
                    <div className='check-wrapper'>
                        <div className='check-text'>Check in</div>
                        <ViewDatesModal spot={spot} startDate2={startDate2} setStartDate2={setStartDate2} setEndDate2={setEndDate2} side={'start'} />
                    </div>
                    <div className='check-wrapper'>
                        <div className='check-text'>Check out</div>
                        <ViewDatesModal spot={spot} endDate2={endDate2} setEndDate2={setEndDate2} setStartDate2={setStartDate2} side={'end'} />
                    </div>

                </div>
                <div className='price-nightly'>
                    <div className='check-text'>Guests</div>
                    <div className='select-text'>2 Adults</div>
                </div>
                <div className='booking-button-container'>
                    <button type="submit" className='booking-button' disabled={user?.id === spot?.owner?.id}>{user?.id !== spot?.owner?.id ? 'Instant Book' : 'Cannot Book Owned Spot'}</button>
                </div>
            </form>
                {validationErrors.length > 0 && submitted && (
                    <div className='booking-error-wrapper top-border'>
                        <div className="booking-error no-padding">
                            {validationErrors.map((error) => <div key={error} className="error-li">{error}</div>)}
                        </div>
                    </div>
                )}
        </div>
    )
}