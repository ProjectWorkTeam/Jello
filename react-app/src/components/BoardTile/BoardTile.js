import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BoardDeleteModal from '../List/ListDeleteModal'; 
import { thunkAllBoards, thunkADeleteBoard } from '../../store/boardsReducer';

const BoardTile = ({ board, index }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // New state for delete modal
  const dispatch = useDispatch();

  const handleDelete = () => {
    setDeleteModalOpen(true); // Open delete modal instead of window.confirm
  };

  const confirmDelete = () => { // Function to be called when deletion is confirmed
    dispatch(thunkADeleteBoard(board.id)).then(() => {
      dispatch(thunkAllBoards());
    });
    setDeleteModalOpen(false);
  };

  return (
    <Draggable draggableId={`board_${board.id}`} index={index}>
      {(provided) => (
        <div className="board-tile" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Link to={`/board/${board.id}`}>
            <h3>{board.name}</h3>
          </Link>
          <button onClick={handleDelete}>Delete</button>
          {deleteModalOpen && <BoardDeleteModal confirmDelete={confirmDelete} closeModal={() => setDeleteModalOpen(false)} />} {/* New delete modal */}
        </div>
      )}
    </Draggable>
  );
}

export default BoardTile;
