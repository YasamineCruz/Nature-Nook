// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './UploadUserPhotoModal.css';

const UploadUserPhotoModalContext = React.createContext();

export function UploadUserPhotoModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <UploadUserPhotoModalContext.Provider value={value}>
        {children}
      </UploadUserPhotoModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function UploadUserPhotoModal({ onClose, children }) {
  const modalNode = useContext(UploadUserPhotoModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="user-photo-modal">
      <div id="user-photo-modal-background" onClick={onClose} />
      <div id="user-photo-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}