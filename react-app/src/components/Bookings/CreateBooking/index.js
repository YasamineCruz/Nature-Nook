import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBooking } from "../../../store/spot";
import './CreateBooking.css'
import { addZero } from "../../../component-resources";
import ViewDatesModal from "../BookingDates";

export default function CreateBooking({ spotId, spot }) {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const bookingInfo = {
            start_date: startDate,
            end_date: endDate
        }

        let response = await dispatch(createBooking(spotId, bookingInfo))

        console.log(response)
    }

    return (
        <div className='price-single-card'>
            <form onSubmit={onSubmit}>
                {validationErrors.length > 0 && (
                    <div id="validations-bookings-box">
                        <ul className="list--errors">
                            {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                        </ul>
                    </div>
                )}
                <div className='price-nightly'>
                    <div>${addZero(spot.price)}</div>
                    <div className='per-text'>per night (2 guests)</div>
                </div>
                <div className='date-holder'>
                    <div className='check-wrapper'>
                        <div className='check-text'>Check in</div>
                        <ViewDatesModal setStartDate={setStartDate} startDate={startDate} side={'start'}/>
                    </div>
                    <div className='check-wrapper'>
                        <div className='check-text'>Check out</div>
                        <ViewDatesModal setEndDate={setEndDate} endDate={endDate} side={'end'}/>
                    </div>

                </div>
                <div className='price-nightly'>
                    <div className='check-text'>Guests</div>
                    <div className='select-text'>2 Adults</div>
                </div>
                <div className='booking-button-container'>
                    <button
                        type="submit"
                        disabled={validationErrors.length}
                        className='booking-button'>
                        Instant book
                    </button>
                </div>
            </form>
        </div>
    )
}