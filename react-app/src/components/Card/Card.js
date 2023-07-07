import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.css';

function Card({ card, index, openCardModal }) {
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

  if (!card) return null;
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div className="card" onClick={handleCardClick} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
      )}
    </Draggable>
  );
}

export default Card;
