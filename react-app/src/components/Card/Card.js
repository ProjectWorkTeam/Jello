import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // new state for delete modal

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleCardClick = () => {
    openCardModal(card.id)
  };

  const handleDelete = async () => {
    setDeleteModalOpen(true); // open delete modal instead of window.confirm
  };

  const confirmDelete = async () => { // function to be called when deletion is confirmed
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
      {(provided, snapshot) => (
           <div
           className={`card ${snapshot.isDragging ? 'dragging' : ''}`}
           ref={provided.innerRef}
           {...provided.draggableProps}
           {...provided.dragHandleProps}
           style={{
             ...provided.draggableProps.style,
             transform: snapshot.isDragging ? `${provided.draggableProps.style.transform} translate(0, -10px)` : provided.draggableProps.style.transform,
           }}
         >
          {editable ? (
            <input value={title} onChange={handleTitleChange} onBlur={handleTitleBlur} onKeyDown={handleTitleKeyDown} autoFocus />
          ) : (
            <div>
            <p className="card-title" onClick={handleTitleClick}>
              {card.title}
            </p>
            </div>
          )}
          <div className='button container'>
          {isMenuOpen && (<div className="card-menu" onClick={handleCardClick}></div>)}
          <OpenModalButton key={card.id} modalComponent={<CardModal cardId={card.id} closeModal={closeCardModal} />} onModalClose={closeCardModal} buttonText={<><i className="fa-solid fa-pen-to-square" /> Edit</>}></OpenModalButton>
          <button onClick={handleDelete}>
      <i className="fas fa-trash-alt"></i>
    </button>
    {deleteModalOpen && <CardDeleteModal confirmDelete={confirmDelete} closeModal={() => setDeleteModalOpen(false)} />}
          </div>
        </div>
      )}
    </Draggable>
  );
}


export default Card;
