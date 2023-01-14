// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { BookingsDatesModal } from '../../../context/BookingDatesModal';
import BookingDate from './BookingDates';

function ViewDatesModal({setEndDate, setStartDate, endDate, startDate, side, spot, setSide}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='select-text pointer' onClick={() => {
        setShowModal(true);
      }}>SelectDate</div>
      {showModal && (
        <BookingsDatesModal onClose={() => setShowModal(false)}>
          <BookingDate spot={spot} side={side} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} startDate={startDate} setShowModal={setShowModal} setSide={setSide}/>
        </BookingsDatesModal>
      )}
    </>
  );
}

export default ViewDatesModal;