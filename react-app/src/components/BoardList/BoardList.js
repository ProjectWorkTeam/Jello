import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { thunkAllBoards, thunkUpdateBoardPosition } from '../../store/boardsReducer';
import BoardTile from '../BoardTile/BoardTile';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.values(state.boards.boards || {}));
  const sortedBoards = [...boards].sort((a, b) => a.position_id - b.position_id);

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.index === source.index) return;
    const boardToMove = sortedBoards[0][source.index];
    const newPositionId = destination.index + 1;
    dispatch(thunkUpdateBoardPosition(boardToMove.id, { position_id: newPositionId }));
  };


  if (boards.length < 1) {
    return <p>No boards found.</p>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <h1>Board List</h1>
        <Droppable droppableId="boardList" >
          {(provided) => (
            <div classname="board_list"
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
  );
};

export default BoardList;
