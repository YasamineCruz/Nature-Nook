import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import './calendar.css'
import { addZero } from "../../../component-resources";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../../store/spot";
import { useHistory } from "react-router-dom";


export const convertForPythonBackend = (date) => {
    let newDate = `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} 00:00:00`
    return newDate
}

export default function BookingDate({ setShowModal, spot, startDate, endDate, setStartDate, setEndDate }) {
    const [value, onChange] = useState(startDate && endDate ? [new Date(startDate), new Date(endDate)] : '');
    const [show, setShow] = useState(false)
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    const dispatch = useDispatch()


    useEffect(() => {
        if (value) {
            setStartDate(new Date(value[0]).toDateString())
            setEndDate(new Date(value[1]).toDateString())
            setShow(true)
        }
    }, [value])

    const onSubmit = async (e) => {
        e.preventDefault();
        let errors = [];
        setSubmitted(true)
        setValidationErrors([])

        const bookingInfo = {
            start_date: convertForPythonBackend(startDate),
            end_date: convertForPythonBackend(endDate)
        }
        let response = await dispatch(createBooking(spot.id, bookingInfo))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    errors.push(data.errors)
                };
                setValidationErrors(errors)
            });
        if(response.errors){
            errors.push(response.errors)
            setValidationErrors(errors)
        }
        if (errors.length <= 0) {
            setStartDate("")
            setEndDate("")
            setSubmitted(false)
            setShowModal(false)
            history.push(`/user/${user.id}`)
        }
    }

    return (
        <div>
            {!show && (
                <div>
                    <div className='price-nightly2'>
                        <div className='price-text2'>${addZero(spot.price)}</div>
                        <div className='per-text2'>average per night (2 guests)</div>
                    </div>
                    <div className='date-holder2'>
                        <div
                            className={'check-wrapper2'}
                        >
                            <div className='check-text add-margin-check top'>Check in</div>
                            <div className='select-text add-margin-check'>{startDate ? startDate : 'Select Date'}</div>
                        </div>
                        <div className='check-wrapper2 no-side'>
                            <div className='check-text add-margin-check top'>Check out</div>
                            <div className='select-text add-margin-check'>{endDate ? endDate : 'Select Date'}</div>
                        </div>
                    </div>
                    <Calendar
                        minDate={new Date()}
                        onChange={onChange}
                        value={value}
                        calendarType={'US'}
                        selectRange={true}
                        formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                    />
                    <div className='price-nightly2'>
                        <div className='check-text no-margin'>Guests</div>
                        <div className='select-text'>2 Adults</div>
                    </div>
                </div>

            )}
            {value && show && (
                <div>
                    <div className='price-nightly2'>
                        <div className='price-text2'>${addZero(spot.price)}</div>
                        <div className='per-text2'>average per night (2 guests)</div>
                    </div>
                    <div className='date-holder2'>
                        <div
                            className={'check-wrapper2'}
                        >
                            <div className='check-text add-margin-check top' onClick={() => setShow(false)}>Check in</div>
                            <div className='select-text add-margin-check'>{startDate ? startDate : 'Select Date'}</div>
                        </div>
                        <div className='check-wrapper2 no-side'>
                            <div className='check-text add-margin-check top' onClick={() => setShow(false)}>Check out</div>
                            <div className='select-text add-margin-check'>{endDate ? endDate : 'Select Date'}</div>
                        </div>
                    </div>
                    <div className='price-nightly2 top-border'>
                        <div className='check-text no-margin'>Guests</div>
                        <div className='select-text'>2 Adults</div>
                    </div>
                    <div className='subtotal-container'>
                        <div className='sub-text'>Subtotal</div>
                        <div className='sub-text'>{Math.round((new Date(endDate).getDate() - new Date(startDate).getDate()) * spot.price)}$</div>
                    </div>
                    <div className='booking-button-container border-bottom'>
                        <button className='change-dates-button' onClick={() => setShow(false)}>Change Dates</button>
                    </div>
                    <div className='booking-button-container'>
                        <button className='booking-button' onClick={onSubmit}>Book</button>
                    </div>
                </div>

            )}
             {validationErrors.length > 0 && submitted && (
                    <div className='booking-error-wrapper'>
                        <div className="booking-error">
                            {validationErrors.map((error) => <div key={error} className="error-li">{error}</div>)}
                        </div>
                    </div>
                )}
        </div>
    )
}