import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { thunkAllBoards, thunkUpdateBoardPosition, thunkAddBoard, thunkADeleteBoard } from '../../store/boardsReducer';
import BoardTile from '../BoardTile/BoardTile';
import './BoardList.css'
import BoardModal from '../BoardModal/BoardModal';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.values(state.boards.boards) || []);
  const sortedBoards = boards.sort((a, b) => a.position_id - b.position_id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);

  console.log('\n', "Boards", boards, '\n')
  console.log('\n', "Sorted Boards", sortedBoards[0], '\n')

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

  const handleDelete = (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      dispatch(thunkADeleteBoard(boardId)).then(() => {
        dispatch(thunkAllBoards());
      });
    }
  }

  const handleCreateBoard = async (newBoard) => {
    dispatch(thunkAddBoard(newBoard));
    setIsModalOpen(false);
  };

  return (
    <div className="workspace-container">
    <div className="workspace-info">
      <h3>{boards.name}Workspace Here</h3>
    </div>
    <div className="sidebar-container">
      <div className="side-bar">
        <h2 className="main-workspace">Main Workspace</h2>
        <a href="/home"><h3>Dashboard</h3></a>
        <h4>Your Boards</h4>
      </div>
    </div>
    <div className="board-list-container">
      <h1>Board List</h1>
      <button onClick={() => setIsModalOpen(true)}>Create Board</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <Droppable droppableId="boardList">
            {(provided) => (
              <div className="board_list" {...provided.droppableProps} ref={provided.innerRef}>
                {sortedBoards.map((board, index) => (
                  <div key={board.id}>
                    <BoardTile board={board} index={index} dispatch={dispatch} deleteBoard={thunkADeleteBoard} />
                    <button onClick={() => handleDelete(board.id)}>Delete</button>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      {isModalOpen && <BoardModal closeModal={() => setIsModalOpen(false)} onCreateBoard={handleCreateBoard} />}
    </div>
  </div>
);
}
export default BoardList;
