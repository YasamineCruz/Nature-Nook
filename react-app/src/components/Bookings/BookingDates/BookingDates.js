import { useState } from "react";
import Calendar from 'react-calendar';
import './calendar.css'
import { addZero } from "../../../component-resources";

export default function BookingDate({ setEndDate, setStartDate, endDate, startDate, setShowModal, side, spot, setSide }) {
    const [showStartDate, setShowStartDate] = useState(side === 'start' ? true : false)
    const [showEndDate, setShowEndDate] = useState(side === 'end' ? true : false)
    const [value, onChange] = useState(new Date());
    const [newSide, setNewSide] = useState(side)

    return (
        <div>
            {newSide === 'start' && (
                <div>
                    <div className='price-nightly2'>
                        <div className='price-text2'>${addZero(spot.price)}</div>
                        <div className='per-text2'>average per night (2 guests)</div>
                    </div>
                    <div className='date-holder2'>
                        <div className='check-wrapper2 dark-background'>
                            <div className='check-text add-margin-check top'>Check in</div>
                            <div className='select-text add-margin-check'>{startDate ? startDate : 'Select Date'}</div>
                        </div>
                        <div className='check-wrapper2 pointer' onClick={() => {
                            setNewSide('end')
                        }
                        }>
                            <div className='check-text add-margin-check top'>Check out</div>
                            <div className='select-text add-margin-check'>{endDate ? endDate : 'Select Date'}</div>
                        </div>
                    </div>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        calendarType={'US'}
                        formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                    />
                    <div className='price-nightly2'>
                        <div className='check-text no-margin'>Guests</div>
                        <div className='select-text'>2 Adults</div>
                    </div>
                </div>
            )}
            {newSide === 'end' && (
                <div>
                    <div className='price-nightly'>
                        <div className='price-text2'>${addZero(spot.price)}</div>
                        <div className='per-text2'>average per night (2 guests)</div>
                    </div>
                    <div className='date-holder2'>
                        <div className='check-wrapper2' onClick={() => setNewSide('start')}>
                            <div className='check-text add-margin-check top'>Check in</div>
                            <div className='select-text add-margin-check'>{startDate ? startDate : 'Select Date'}</div>
                        </div>
                        <div className='check-wrapper2 dark-background'>
                            <div className='check-text add-margin-check top'>Check out</div>
                            <div className='select-text add-margin-check'>{endDate ? endDate : 'Select Date'}</div>
                        </div>
                    </div>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        calendarType={'US'}
                        formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                    />
                    <div className='price-nightly2'>
                        <div className='check-text no-margin'>Guests</div>
                        <div className='select-text'>2 Adults</div>
                    </div>
                </div>
            )}
        </div>
    )
}