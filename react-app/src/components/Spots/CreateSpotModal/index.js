// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateSpotForm from './CreateSpotForm';

function CreateSpotModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <div onClick={() => {
        setShowModal(true);
      }}>Create Spot</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotModal;