import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const BoardTile = ({ board, index }) => {
  return (
    <Draggable draggableId={`board-${board.id}`} index={index}>
      {(provided) => (
        <div
          className="board-tile"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3>{board.name}</h3>
        </div>
      )}
    </Draggable>
  );
};

export default BoardTile;
