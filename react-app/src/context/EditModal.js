// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './EditModal.css';

const EditModalContext = React.createContext();

export function EditModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <EditModalContext.Provider value={value}>
        {children}
      </EditModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function EditModal({ onClose, children }) {
  const modalNode = useContext(EditModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="edit-modal">
      <div id="edit-modal-background" onClick={onClose} />
      <div id="edit-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}