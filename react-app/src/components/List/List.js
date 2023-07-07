import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import { thunkEditList} from '../../store/listsReducer'
import { thunkMoveCard, thunkMakeCard } from '../../store/cardsReducer';
import './List.css';

function List({ list, cards }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(list.name);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const dispatch = useDispatch();

  const handleTitleClick = () => {
    setEditMode(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = async () => {
    await dispatch(thunkEditList(list.id, { name: title }));
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewCardDescription(e.target.value);
  };

  const handleInputSubmit = async () => {
    if (newCardTitle.trim() === '' || newCardDescription.trim() === '') {
      alert('Please fill out both the title and description fields.');
      return;
    }
  
    const newCard = {
      title: newCardTitle,
      description: newCardDescription,
      listId: list.id,
    };
  
    const createdCard = await dispatch(thunkMakeCard(newCard));
  
    if (createdCard) {
      const { id, listId } = createdCard;
      dispatch(thunkMoveCard(id, { listId, positionId: cards.length }));
    }
  
    setNewCardTitle('');
    setNewCardDescription('');
    setIsAdding(false);
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
                autoFocus
              />
            ) : (
              title
            )}
          </h3>
          <h3 className="list-actions">...</h3>
        </div>
        <div>
          <Droppable droppableId={String(list.id)}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {cards?.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="list-footer">
          {isAdding ? (
            <div>
              <input
                type="text"
                value={newCardTitle}
                onChange={handleInputChange}
                placeholder="Enter a title for this card..."
                autoFocus
              />
              <input
                type="text"
                value={newCardDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter a description for this card..."
              />
              <button onClick={handleInputSubmit}>Submit</button>
            </div>
          ) : (
            <div className="add-card" onClick={() => setIsAdding(true)}>
              <a className="add-card-icon">+</a>
              <h4 className="add-card-text">Add a card</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
