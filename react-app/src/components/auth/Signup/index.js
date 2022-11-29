// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { SignupModal } from '../../../context/SignupModal';
import SignUpForm from './SignUpForm';


function SignupUserModal() {
  const [showModal, setShowModal] = useState(true)
  

  return (
    <>
      {showModal && (
        <SignupModal>
          <SignUpForm showModal={showModal} setShowModal={setShowModal}/>
        </SignupModal>
      )}
    </>
  );
}

export default SignupUserModal;