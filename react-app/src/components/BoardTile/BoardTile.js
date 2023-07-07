import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

const BoardTile = ({ board, index, dispatch, deleteBoard }) => {

  return (
    <Draggable draggableId={`board_${board.id}`} index={index}>
      {(provided) => (
        <div>
          <Link to={`/board/${board.id}`}>
            <div
              className="board-tile"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <h3>{board.name}</h3>
            </div>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

export default BoardTile;
