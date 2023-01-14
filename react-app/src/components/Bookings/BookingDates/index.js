// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { BookingsDatesModal } from '../../../context/BookingDatesModal';
import BookingDate from './BookingDates';

function ViewDatesModal({setEndDate, setStartDate, endDate, startDate, side}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='select-text edit-only pointer' onClick={() => {
        setShowModal(true);
      }}>SelectDate</div>
      {showModal && (
        <BookingsDatesModal onClose={() => setShowModal(false)}>
          <BookingDate side={side} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} startDate={startDate} setShowModal={setShowModal}/>
        </BookingsDatesModal>
      )}
    </>
  );
}

export default ViewDatesModal;