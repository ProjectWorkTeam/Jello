import React from 'react';
import './Card.css';

function Card({ card }) {
  if (!card) return null;
  return (
    <div className="card">
      <p className="card-title">{card.title}</p>
    </div>
  );
}

export default Card;
