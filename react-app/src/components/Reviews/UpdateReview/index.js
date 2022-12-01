// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { ReviewUpdateModal } from '../../../context/ReviewUpdateModal'
import UpdateReview  from './ReviewUpdate'

function UpdateReviewModal({review}) {
  const [showModal, setShowModal] = useState(false)


  return (
    <>
      <div className='update-review-text edit-only' onClick={() => {
        setShowModal(true);
      }}>Edit Review</div>
      {showModal && (
        <ReviewUpdateModal onClose={() => setShowModal(false)}>
          <UpdateReview reviewInfo={review} setShowModal={setShowModal}/>
        </ReviewUpdateModal>
      )}
    </>
  );
}

export default UpdateReviewModal;