import { useState } from "react";
import Calendar from 'react-calendar';

export default function BookingDate({ setEndDate, setStartDate, endDate, startDate, setShowModal, side }) {
    const [showStartDate, setShowStartDate] = useState(side === 'start' ? true : false)
    const [showEndDate, setShowEndDate] = useState(side === 'end' ? true : false)
    const [value, onChange] = useState(new Date());

    return (
        <div>
            {side === 'start' && (
                <div>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        />
                </div>
            )}
            {side === 'end' && (
                <div>
                    <Calendar onChange={onChange} value={value} />
                </div>
            )}
        </div>
    )
}