import React from 'react';
import './BoardDeleteModal.css';

function BoardDeleteModal({ confirmDelete, closeModal }) {
  return (
    <div className="overlay">
      <div className="board-delete-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this board?</p>
        <button onClick={confirmDelete}>Yes, delete it</button>
        <button onClick={closeModal}>No, keep it</button>
      </div>
    </div>
  );
}

export default BoardDeleteModal;
