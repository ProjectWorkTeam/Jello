import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAllBoards, thunkAEditBoard } from '../../store/boardsReducer';
import { thunkBoardLists, thunkMakeList, thunkMoveList } from '../../store/listsReducer';
import { thunkGetCardsByList, thunkMoveCard } from '../../store/cardsReducer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../List/List';
import './Board.css';

function Board() {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [isCreateListModalOpen, setCreateListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const { boardid } = useParams();
  const [board, setBoard] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBoardName, setEditedBoardName] = useState("");
  const [boardNameValidationMessage, setBoardNameValidationMessage] = useState("");

  const boards = useSelector((state) => Object.values(state.boards.boards) || []);

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);

  useEffect(() => {
    const foundBoard = boards.find(b => b.id === parseInt(boardid, 10));
    setBoard(foundBoard);
  }, [boards, boardid]);

  useEffect(() => {
    if (board && board.id) {
      dispatch(thunkBoardLists(board.id));
    }
  }, [dispatch, board]);

  const lists = useSelector(state => state.lists.lists[parseInt(boardid, 10)] || []);

  useEffect(() => {
    lists.forEach(list => {
      dispatch(thunkGetCardsByList(list.id));
    });
  }, [dispatch, lists]);

  const cards = useSelector(state => state.cards || {});

  const toggleSidebar = () => {
    setOpenSideBar(!openSideBar);
  };

  const toggleCreateListModal = () => {
    setCreateListModalOpen(!isCreateListModalOpen);
  };

  const handleNewListNameChange = (e) => {
    setNewListName(e.target.value);
  };

  const createList = async () => {
    if (newListName.trim() === '') {
      // Handle error case
      return;
    }
    const newList = {
      list_name: newListName,
      board_id: board.id,
    };

    dispatch(thunkMakeList(newList));
    setNewListName("");
    toggleCreateListModal();
    dispatch(thunkBoardLists(board.id));
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if(type === 'list') {
      const listId = draggableId;
      const newPosition = destination.index + 1;
      dispatch(thunkMoveList(listId, newPosition));
      dispatch(thunkBoardLists(board.id));
    } else {
      const cardId = draggableId;
      const newListId = destination.droppableId;
      const newPositionId = destination.index + 1;

      const oldListId = source.droppableId;
      const oldPositionId = source.index + 1;

      dispatch(thunkMoveCard(cardId, {
        new_list_id: newListId,
        new_position_id: newPositionId,
        old_list_id: oldListId,
        old_position_id: oldPositionId
      }));
      dispatch(thunkBoardLists(board.id));
    }
  };

  const handleEditBoardName = () => {
    setIsEditing(true);
    setEditedBoardName(board.name);
  };

  const handleSaveBoardName = async () => {
    if (editedBoardName.trim() === '') {
      // Handle empty board name error
      setBoardNameValidationMessage("Board name cannot be empty");
      return;
    }
    // New validation check for board name length
    if (editedBoardName.length > 20) {
      setBoardNameValidationMessage("Board name cannot be more than 20 characters long");
      return;
    }
    const action = await dispatch(thunkAEditBoard(board.id, { name: editedBoardName }));
    if (!action.error) {
      setBoard(prevBoard => ({ ...prevBoard, name: editedBoardName }));
      setBoardNameValidationMessage("");
    }
    dispatch(thunkAllBoards())
    setIsEditing(false);
    setEditedBoardName("");
  };


  const handleCancelEditBoardName = () => {
    setIsEditing(false);
    setEditedBoardName("");
  };

  const sidebarStyle = {
    transform: openSideBar ? 'translateX(0)' : 'translateX(-100%)',
  };

  const boardContentStyle = {
    paddingLeft: openSideBar ? '2rem' : '0',
  };

  return (
    <div className="board">
      <h2>{boards.name}</h2>
      <div className={`sidebar ${openSideBar ? 'open' : ''}`} style={sidebarStyle}>
        <button className="toggle-side-button" onClick={toggleSidebar}></button>
        {openSideBar && (
          <>
            <h2 className='control-title'>Control Menu</h2>
            <a href="/home">Dashboard</a>
          </>
        )}
      </div>
      <div className={`board-content ${openSideBar ? 'sidebar-open' : ''}`} style={boardContentStyle}>
        <div className="board-header">
          {!isEditing ? (
              <h2>{board?.name}</h2>
          ) : (
            <div>
              <input
                type="text"
                value={editedBoardName}
                onChange={(e) => setEditedBoardName(e.target.value)}
              />
              {boardNameValidationMessage && <p className="validation-message">{boardNameValidationMessage}</p>}
              <button onClick={handleSaveBoardName}>Save</button>
              <button onClick={handleCancelEditBoardName}>Cancel</button>
            </div>
          )}
          {!isEditing && (
            <i class="fa-solid fa-pen-to-square" onClick={handleEditBoardName}></i>
          )}
          <div className="add-list-container">
            <button className="add-list-button" onClick={toggleCreateListModal}>
              <i className="fas fa-plus-circle add-list-icon"></i> Add a List
            </button>
            {isCreateListModalOpen && (
              <div className="create-list-modal">
                <input className="create-list-input" type="text" value={newListName} onChange={handleNewListNameChange} />
                <button className={`create-list-button ${newListName.length >= 1 && newListName.length <= 15 ? '' : 'disabled'}`} onClick={createList} disabled={newListName.length < 1 || newListName.length > 15}>Create List</button>
              </div>
            )}
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div className="lists-container" style={{ display: "flex", flexDirection: "row" }} {...provided.droppableProps} ref={provided.innerRef}>
                {[...lists].sort((a, b) => a.position_id - b.position_id).map((list, index) => (
                  <List key={list.id} list={list} index={index} cards={cards[list.id]?.map(cardId => cards.cards[cardId])} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board;
