import React from 'react';
import './Card.css';

function Card({ card, openCardModal }) {
  const handleCardClick = () => {
    openCardModal(card.id);
  }
  return (
    <div className="card" onClick={handleCardClick}>
      <p className="card-title">{card.title}</p>
    </div>
  );
}

export default Card;
