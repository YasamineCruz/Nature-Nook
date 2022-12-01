// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { DeleteModal } from '../../../context/DeleteModal'
import { DeleteSpot } from './DeleteSpot';

function DeleteSpotModal({spotId, spot}) {
  const [showModal, setShowModal] = useState(false)


  return (
    <>
      <div onClick={() => {
        setShowModal(true);
      }}>Delete Spot</div>
      {showModal && (
        <DeleteModal onClose={() => setShowModal(false)}>
          <DeleteSpot spotId={spotId} spot={spot} setShowModal={setShowModal}/>
        </DeleteModal>
      )}
    </>
  );
}

export default DeleteSpotModal;