import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from '../CardModal/CardModal';
import OpenModalButton from '../OpenModalButton';
import { thunkDeleteCard, thunkGetCardsByList, thunkEditCard } from '../../store/cardsReducer';
import { useDispatch } from 'react-redux';

import './Card.css';


function Card({ card, index }) {
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectCard, setSelectCard] = useState(null);
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(card.title);

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

  const handleTitleClick = () => {
    setEditable(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = async () => {
    if (title !== card.title) {
      await dispatch(thunkEditCard(card.id, { title, list_id: card.list_id })); // update card
    }
    setEditable(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  if (!card) return null;
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {editable ? (
            <input
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              autoFocus
            />
          ) : (
            <p className="card-title" onClick={handleTitleClick}>
              {card.title}
            </p>
          )}
          {isMenuOpen && (
            <div className="card-menu" onClick={handleCardClick}>
              <ul>
                <li>Edit</li>
              </ul>
            </div>
          )}
          <OpenModalButton
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
