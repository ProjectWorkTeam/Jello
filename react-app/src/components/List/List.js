import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkEditList, thunkMoveCard } from '../../store/listsReducer';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import './List.css';

function List({ list, cards }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(list.name);
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
          <div className="add-card">
            <a className="add-card-icon">+</a>
            <h4 className="add-card-text">Add A Card</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
