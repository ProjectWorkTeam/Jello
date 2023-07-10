import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable,Draggable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import { thunkEditList, thunkBoardLists, thunkDeleteList } from '../../store/listsReducer'
import { thunkMoveCard, thunkMakeCard } from '../../store/cardsReducer';

import './List.css';

function List({ list, cards,index }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(list.name);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [listErrorMessage, setListErrorMessage] = useState('');
  const [cardErrorMessage, setCardErrorMessage] = useState('');



  const dispatch = useDispatch();

  const handleTitleClick = () => {
    setEditMode(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = async () => {
    if (title.trim() === '') {
      setListErrorMessage('Please enter a title for the list.');
      return;
    }

    await dispatch(thunkEditList(list.id, { list_name: title }));
    setEditMode(false);
    setListErrorMessage('');
  };

  const handleInputChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewCardDescription(e.target.value);
  };

  const handleInputSubmit = async () => {
    if (newCardTitle.trim() === '') {
      setCardErrorMessage('Please enter a title for the card.');
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
      dispatch(thunkMoveCard(id, { listId, position_id: cards.length }));
    }

    setNewCardTitle('');
    setNewCardDescription('');
    setIsAdding(false);
    setCardErrorMessage('');
  };

  const handleDeleteList = async () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      dispatch(thunkDeleteList(list.id));
      dispatch(thunkBoardLists(list.board_id));
    }
  };

  const handleInputChange = (e) => {
    setNewCardTitle(e.target.value);
  };
  
  const handleInputSubmit = async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        await dispatch(thunkMakeCard({
            title: newCardTitle,
            listId: list.id,  // ensure list.id is not undefined
            description: '', 
            position: cards.length,
        })); 
        setNewCardTitle("");
        setIsAdding(false);
    }
};



  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(provided) => (
        <div className="list-container" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="list">
            <div className="list-header">
              {listErrorMessage && <div className="error-message">{listErrorMessage}</div>}
              <h3 className="list-title" onClick={handleTitleClick}>
                {editMode ? (
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        handleTitleSubmit();
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  title
                )}
              </h3>
              <button onClick={handleDeleteList}><i className="fas fa-trash-alt"></i></button>
            </div>
            <div className="cards-list">
              <Droppable droppableId={String(list.id)}>
                {(provided) => (
                  <ul className="card-buttons" {...provided.droppableProps} ref={provided.innerRef} style={{ minHeight: "5px" }}>
                    {cards?.sort((a, b) => a.position_id - b.position_id).map((card, index) => (
                      <div key={card.id}>
                        <Card card={card} index={index} />
                      </div>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>

            <div className="list-footer">
              {isAdding ? (
                <div className='list-footer-adding'>
                  {cardErrorMessage && <div className="error-message">{cardErrorMessage}</div>}
                  <div className="list-footer-content">
                    <input
                      type="text"
                      value={newCardTitle}
                      onChange={handleInputChange}
                      placeholder="Enter a title for this card..."
                      autoFocus
                      className="list-card-title-input"
                    />
                    <input
                      type="text"
                      value={newCardDescription}
                      onChange={handleDescriptionChange}
                      placeholder="Enter a description for this card..."
                      className="list-card-description-input"
                    />
                    <div className="button-group">
                      <button onClick={handleInputSubmit}>Submit</button>
                      <button className="cancel-button" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="add-card" onClick={() => setIsAdding(true)}>
                  <h4 className="add-card-text">+  Add a card</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default List;
