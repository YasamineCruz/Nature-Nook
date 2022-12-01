// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ReviewUpdateModal.css';

const ReviewUpdateModalContext = React.createContext();

export function ReviewUpdateModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <ReviewUpdateModalContext.Provider value={value}>
        {children}
      </ReviewUpdateModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function ReviewUpdateModal({ onClose, children }) {
  const modalNode = useContext(ReviewUpdateModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="review-update-modal">
      <div id="review-update-modal-background" onClick={onClose} />
      <div id="review-update-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}