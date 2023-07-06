import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { thunkAllBoards, thunkUpdateBoardPosition } from '../../store/boardsReducer';
import BoardTile from '../BoardTile/BoardTile';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.values(state.boards.boards) || [])
  const sortedBoards = [...boards].sort((a, b) => a.position_id - b.position_id);
  console.log('\n',"Boards",boards,'\n')
  console.log('\n',"Sorted Boards",sortedBoards[0],'\n')

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    console.log(draggableId)
    // Assuming that your draggableId is in the format 'board_id'
    const boardId = draggableId.split('_')[1];

    // Your new position_id will be the destination index
    const newPositionId = destination.index;

    const newBoardState = {
      id: boardId,
      position_id: newPositionId
    };

    dispatch(thunkUpdateBoardPosition(newBoardState));
  };



  if (boards.length < 1) {
    return <p>No boards found.</p>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <h1>Board List</h1>
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
  );
};

export default BoardList;
