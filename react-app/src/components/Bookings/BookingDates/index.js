// frontend/src/components/LoginFormModal/index.js
import React, { useEffect, useState } from 'react';
import { BookingsDatesModal } from '../../../context/BookingDatesModal';
import BookingDate from './BookingDates';
import { useSelector } from 'react-redux';

function ViewDatesModal({side, spot, setEndDate2, setStartDate2, endDate2, startDate2}) {
  const [showModal, setShowModal] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const user = useSelector((state) => state.session.user)

  useEffect(()=>{
    if(endDate) setEndDate2(endDate)
    if(startDate) setStartDate2(startDate)
    if(!endDate) setEndDate2(endDate)
    if(!startDate) setStartDate2(startDate)
  },[endDate, startDate])


  return (
    <>
      <div className='select-text pointer' onClick={() => {
        if(user && user?.id !== spot?.owner?.id) setShowModal(true);
      }}>{side === 'end' && (
        <div>{endDate2 ? endDate2 : 'Select Date'}</div>
      )}
      {side === 'start' && (
        <div>{startDate2 ? startDate2 : 'Select Date'}</div>
      )}
      {!side && (
        <div>Select Date</div>
      )}
      </div>
      {showModal && (
        <BookingsDatesModal onClose={() => setShowModal(false)}>
          <BookingDate spot={spot} side={side} setShowModal={setShowModal} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
        </BookingsDatesModal>
      )}
    </>
  );
}

export default ViewDatesModal;