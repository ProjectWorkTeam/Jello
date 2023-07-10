import React from 'react';
import './ListDeleteModal.css';

function ListDeleteModal({ confirmDelete, closeModal }) {
  return (
    <div className="overlay">
      <div className="list-delete-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this list?</p>
        <button onClick={confirmDelete}>Yes, delete it</button>
        <button onClick={closeModal}>No, keep it</button>
      </div>
    </div>
  );
}

export default ListDeleteModal;

