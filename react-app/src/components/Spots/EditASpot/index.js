// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { EditModal } from '../../../context/EditModal'
import EditSpot from './EditSpot'

function EditSpotModal({spotId, spot}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div onClick={() => {
        setShowModal(true);
      }}>Edit Spot</div>
      {showModal && (
        <EditModal onClose={() => setShowModal(false)}>
         <EditSpot showModal={showModal} setShowModal={setShowModal} spotId={spotId} spot={spot}/>
        </EditModal>
      )}
    </>
  );
}

export default EditSpotModal;