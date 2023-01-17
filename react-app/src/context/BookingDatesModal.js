// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './BookingDatesModal.css';

const BookingsDatesModalContext = React.createContext();

export function BookingsDatesModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <BookingsDatesModalContext.Provider value={value}>
        {children}
      </BookingsDatesModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function BookingsDatesModal({ onClose, children }) {
  const modalNode = useContext(BookingsDatesModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="booking-dates-modal">
      <div id="booking-dates-modal-background" onClick={onClose} />
      <div id="booking-dates-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}