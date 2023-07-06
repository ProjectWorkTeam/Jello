import React, {useState} from 'react';
import './Card.css';

function Card({ card, openCardModal}) {
  const [isMenuOpen, setMenuOpen] = useState(false);


  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleCardClick = () => {
    openCardModal(card.id)
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <p className="card-title">{card.title}</p>
      {isMenuOpen && (
        <div className="card-menu">
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Card;
