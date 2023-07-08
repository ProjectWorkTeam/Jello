import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from '../CardModal/CardModal';
import OpenModalButton from '../OpenModalButton';
import './Card.css';

function Card({ card, index }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectCard, setSelectCard] = useState(null);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const handleCardClick = () => {
    openCardModal(card.id)
  };

  const openCardModal = (cardId) => {
    setSelectCard(cardId);
  };

  const closeCardModal = () => {
    setSelectCard(null);
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
          )}<OpenModalButton
            key={card.id}
            modalComponent={<CardModal cardId={card.id} closeModal={closeCardModal} />}
            buttonText={card.title}
            onModalClose={closeCardModal}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Card;
