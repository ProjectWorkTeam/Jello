import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.css';

function Card({ card, index }) {
  if (!card) return null;
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <p className="card-title">{card.title}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
