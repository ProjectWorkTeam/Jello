import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkEditList, thunkMoveCard } from '../../store/listsReducer';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import './List.css';
import CardModal from '../CardModal/CardModal';
import OpenModalButton from '../OpenModalButton';

function List({ list, cards }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(list.name);
  const [addingCard, setAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [addCards, setCards] = useState([]);
  const [selectCard, setSelectCard] = useState(null);
  const dispatch = useDispatch();

  const handleTitleClick = () => {
    setEditMode(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await dispatch(thunkEditList(list.id, { name: title }));
      setEditMode(false);
    }
  };

  const toggleAddingCard = () => {
    setAddingCard(!addingCard);
    setNewCardTitle('');
  };

  const handleCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleNewCard = () => {
    if (newCardTitle.trim() === '') {
      return;
    }
    const newCard = {
      id: cards.length + 1,
      title: newCardTitle,
      list_id: list.id,
    };
    setCards([...addCards, newCard]);
    setAddingCard(false);
    setNewCardTitle('');
  };

  const openCardModal = (cardId) => {
    setSelectCard(cardId);
  };

  const closeCardModal = () => {
    setSelectCard(null);
  };

  return (
    <div className="list-container">
      <div className="list">
        <div className="list-header">
          <h3 className="list-title" onClick={handleTitleClick}>
            {editMode ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleTitleSubmit}
                autoFocus
              />
            ) : (
              title
            )}
          </h3>
          <h3 className="list-actions">...</h3>
        </div>
        <div className="cards-list">
          <Droppable droppableId={String(list.id)}>
            {(provided) => (
              <ul className="card-buttons"{...provided.droppableProps} ref={provided.innerRef}>
                {cards?.map((card, index) => (
                  <li key={card.id}>
                  <OpenModalButton
                    key={card.id}
                    modalComponent={<CardModal cardId={card.id} closeModal={closeCardModal} />}
                    buttonText={card.title}
                    onModalClose={closeCardModal}
                              />
                    <Card card={card} openCardModal={openCardModal} />
                    </li>
                    ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="list-footer">
          {!addingCard ? (
            <div className="add-card" onClick={toggleAddingCard}>
              <a className="add-card-icon">+</a>
              <h4 className="add-card-text">Add A Card</h4>
            </div>
          ) : (
            <div className="add-card-form">
              <input
                type="text"
                value={newCardTitle}
                onChange={handleCardTitleChange}
                placeholder="Enter card title"
              />
              <div className="add-card-actions">
                <button onClick={handleNewCard}>Save</button>
                <button onClick={toggleAddingCard}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
