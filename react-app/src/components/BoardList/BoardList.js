import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { thunkAllBoards, thunkUpdateBoardPosition, thunkAddBoard } from '../../store/boardsReducer';
import BoardTile from '../BoardTile/BoardTile';
import BoardModal from '../BoardModal/BoardModal'; // Import the BoardModal component

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.values(state.boards.boards) || []);
  const sortedBoards = boards.sort((a, b) => a.position_id - b.position_id);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the visibility of the modal

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);

  console.log('\n', "Boards", boards, '\n')
  console.log('\n', "Sorted Boards", sortedBoards[0], '\n')

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    console.log('\n', 'DraggableId', draggableId, '\n')
    // Assuming that your draggableId is in the format 'board_id'
    const boardId = draggableId.split('_')[1];

    // Your new position_id will be the destination index
    const newPositionId = destination.index + 1
    console.log('\n', "Destination", destination)

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
    setIsModalOpen(false); // Close the modal after creating a board
  };

  if (boards.length < 1) {
    return <p>No boards found.</p>;
  }

  return (
    <div>
      <h1>Board List</h1>
      <button onClick={() => setIsModalOpen(true)}>Create Board</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <Droppable droppableId="boardList">
            {(provided) => (
              <div className="board_list"
                {...provided.droppableProps} ref={provided.innerRef}>
                {sortedBoards[0].map((board, index) => (
                  <BoardTile key={board.id} board={board} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      {isModalOpen && <BoardModal closeModal={() => setIsModalOpen(false)} onCreateBoard={handleCreateBoard} />}
    </div>
  );
};

export default BoardList;
