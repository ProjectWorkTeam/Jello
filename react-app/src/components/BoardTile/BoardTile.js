import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux
import { thunkAllBoards, thunkADeleteBoard } from '../../store/boardsReducer';

const BoardTile = ({ board, index }) => {
  const dispatch = useDispatch();

  const handleDelete = (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      dispatch(thunkADeleteBoard(boardId)).then(() => {
        dispatch(thunkAllBoards());
      });
    }
  };

  return (
    <Draggable draggableId={`board_${board.id}`} index={index}>
      {(provided) => (
        <div className="board-tile" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Link to={`/board/${board.id}`}>
            <h3>{board.name}</h3>
          </Link>
          <button onClick={() => handleDelete(board.id)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
}

export default BoardTile;
