import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import CardModal from '../CardModal/CardModal';
import OpenModalButton from '../OpenModalButton';
import CardDeleteModal from '../Card/CardDeleteModal';
import { thunkDeleteCard, thunkGetCardsByList, thunkEditCard } from '../../store/cardsReducer';
import { useDispatch } from 'react-redux';

import './Card.css';


function Card({ card, index }) {
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectCard, setSelectCard] = useState(null);
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleCardClick = () => {
    openCardModal(card.id)
  };

  const handleDelete = async () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    dispatch(thunkDeleteCard(card.id, card.list_id));
    dispatch(thunkGetCardsByList(card.list_id));
    setDeleteModalOpen(false);
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
      dispatch(thunkEditCard(card.id, { title, list_id: card.list_id }));
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
      {(provided, snapshot) => (
        <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
          {(style) => (
            <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={style}>
              {editable ? (
                <input value={title} onChange={handleTitleChange} onBlur={handleTitleBlur} onKeyDown={handleTitleKeyDown} autoFocus />
              ) : (
                <div> <p className="card-title" onClick={handleTitleClick}> {card.title} </p> </div>
              )}
              <div className='button container'>
                {isMenuOpen && (<div className="card-menu" onClick={handleCardClick}></div>)}
                <OpenModalButton key={card.id} modalComponent={<CardModal cardId={card.id} closeModal={closeCardModal} />} onModalClose={closeCardModal} buttonText={<><i className="fa-solid fa-pen-to-square" id="edit-card-info"/> Edit</>}></OpenModalButton>
                <button onClick={handleDelete}>
                  <i className="fas fa-trash-alt" id="trash-icon"></i>
                </button>
                {deleteModalOpen && <CardDeleteModal confirmDelete={confirmDelete} closeModal={() => setDeleteModalOpen(false)} />}
              </div>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
}


export default Card;
