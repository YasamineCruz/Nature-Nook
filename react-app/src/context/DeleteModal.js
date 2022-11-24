// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './DeleteModal.css';

const DeleteModalContext = React.createContext();

export function DeleteModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <DeleteModalContext.Provider value={value}>
        {children}
      </DeleteModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function DeleteModal({ onClose, children }) {
  const modalNode = useContext(DeleteModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="delete-modal">
      <div id="delete-modal-background" onClick={onClose} />
      <div id="delete-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}