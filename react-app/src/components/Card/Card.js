import React from 'react';
import './Card.css';

function Card({ card }) {
  return (
    <div className="card">
      <p>{card.title}</p>
    </div>
  );
}

export default Card;
