import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { thunkAllBoards, thunkUpdateBoardPosition, thunkAddBoard } from '../../store/boardsReducer';
import BoardTile from '../BoardTile/BoardTile';
import './BoardList.css'
import BoardModal from '../BoardModal/BoardModal';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.values(state.boards.boards) || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const boardId = draggableId.split('_')[1];
    const newPositionId = destination.index + 1

    const newBoardState = {
      id: boardId,
      position_id: newPositionId
    };

    dispatch(thunkUpdateBoardPosition(newBoardState)).then(() => {
      dispatch(thunkAllBoards());
    });
  };

  const handleCreateBoard = async (newBoard) => {
    dispatch(thunkAddBoard(newBoard));
    setIsModalOpen(false);
  };

  return (
    <div className="workspace-container">
      <div className="sidebar-container">
        <div className="side-bar">
          <h2 className="main-workspace">Main Workspace</h2>
          {/* <h3>Future Features</h3>
          <div className='feature-list'>
            <li>Settings</li>
            <li>Shared</li>
          </div> */}
        </div>
      </div>
      <div className="workspace-content">
        <div className='create-board-banner'>
          <h1 className='dashboard-title'> Your Boards</h1>
          <button className='create-board-button' onClick={() => setIsModalOpen(true)}>Create New Board</button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="boardList" direction="vertical">
            {(provided) => (
              <div className="board_list" {...provided.droppableProps} ref={provided.innerRef}>
                {boards.map((board, index) => (
                  <BoardTile key={board.id} board={board} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isModalOpen && <BoardModal closeModal={() => setIsModalOpen(false)} onCreateBoard={handleCreateBoard} />}
      </div>
    </div>
  );
};

export default BoardList;
