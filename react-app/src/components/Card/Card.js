import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from '../CardModal/CardModal';
import OpenModalButton from '../OpenModalButton';
import { thunkDeleteCard } from '../../store/cardsReducer';
import { thunkGetCardsByList } from '../../store/cardsReducer';
import { useDispatch } from 'react-redux';

import './Card.css';

function Card({ card, index }) {
  const dispatch = useDispatch();
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      dispatch(thunkDeleteCard(card.id, card.list_id));
      dispatch(thunkGetCardsByList(card.list_id))
    }
    closeMenu();
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
              </ul>
            </div>
          )}<OpenModalButton
            key={card.id}
            modalComponent={<CardModal cardId={card.id} closeModal={closeCardModal} />}
            buttonText={card.title}
            onModalClose={closeCardModal}
          />
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
