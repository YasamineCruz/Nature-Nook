import { useDispatch } from "react-redux"
import { deleteBooking } from "../../../store/spot"
import './DeleteBookings.css'

export default function DeleteBooking({userId, bookingId, setReload}) {
    const dispatch = useDispatch()

    const deleteABooking = async(userId, bookingId) => {
        let response = await dispatch(deleteBooking(bookingId, userId))
        setReload(true)
    }

    return (
        <div className='delete-booking-wrapper'>
            <button className='delete-booking-button' onClick={()=> deleteABooking(userId, bookingId)}>Delete Booking</button>
        </div>
    )
}