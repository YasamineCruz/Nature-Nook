// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateSpotForm from './CreateSpotForm';

function CreateSpotModal({setStop, setShowDropdown}) {
  const [showModal, setShowModal] = useState(false)


  return (
    <div>
      <div className='dropdown-link create-spot' onClick={(e) => {
        setStop(true)
        setShowModal(true);
      }}>Create Spot</div>
      {showModal && (
        <Modal onClose={() => { setShowModal(false); setStop(false) ; setShowDropdown(false)}}>
          <CreateSpotForm setShowDropdown={setShowDropdown} showModal={showModal} setShowModal={setShowModal} setStop={setStop}/>
        </Modal>
      )}
    </div>
  );
}

export default CreateSpotModal;