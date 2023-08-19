import React from 'react';
import './CardDeleteModal.css';  // import the css

function CardDeleteModal({ confirmDelete, closeModal }) {
  return (
    <div className="overlay"> {/* overlay div to darken the rest of the screen */}
      <div className="card-delete-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this card?</p>
        <button className="yes-delete-button" onClick={confirmDelete}>Yes, delete it</button>
        <button className="no-delete-button" onClick={closeModal}>No, keep it</button>
      </div>
    </div>
  );
}

export default CardDeleteModal;
