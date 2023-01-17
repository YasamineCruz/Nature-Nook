// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { UploadUserPhotoModal } from '../../../context/UploadUserPhotoModal'
import UserModalPost from './UserModal';
import UserModalPut from './UserModalPut';


function UserPhotoModal({id, type, setUpdate}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className='upload-photo pointer' onClick={(e) => setShowModal(true)}>
      <i class="fa-solid fa-pencil"></i>
      </div>
      {showModal && (
        <UploadUserPhotoModal onClose={() => setShowModal(false) }>
            {type === 'post' && (
                <UserModalPost setUpdate={setUpdate} id={id} setShowModal={setShowModal}/>
            )}
            {type === 'put' && (
                <UserModalPut setUpdate={setUpdate} id={id} setShowModal={setShowModal}/>
            )}
        </UploadUserPhotoModal>
      )}
    </div>
  );
}

export default UserPhotoModal;