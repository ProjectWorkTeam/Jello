import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAllBoards } from '../../store/boardsReducer';
import { thunkBoardLists, thunkMakeList } from '../../store/listsReducer';
import { thunkGetCardsByList, thunkMoveCard } from '../../store/cardsReducer';
import { DragDropContext } from 'react-beautiful-dnd';
import List from '../List/List';
import BoardModal from '../BoardModal/BoardModal';
import CardModal from '../CardModal/CardModal';
import './Board.css';

function Board() {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCreateListModalOpen, setCreateListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const boards = useSelector((state) => Object.values(state.boards.boards) || []);
  const { boardid } = useParams();
  const [board, setBoard] = useState();

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);
  useEffect(() => {
    const foundBoard = boards.find(b => b.id === parseInt(boardid, 10));
    setBoard(foundBoard);
    if (foundBoard && foundBoard.id) {
      // console.log('\n', 'FoundBoard === True', foundBoard.id)
    }
  }, [boards, boardid]);
  // console.log('\n', 'Board_board.js', board);
  useEffect(() => {
    if (board && board.id) {
      dispatch(thunkBoardLists(board.id));
    }
  }, [dispatch, board]);
  const lists = useSelector(state => state.lists.lists[parseInt(boardid, 10)] || []);
  // console.log('\n', 'lists_board.js', lists);
  useEffect(() => {
    lists.forEach(list => {
      dispatch(thunkGetCardsByList(list.id));
    });
  }, [dispatch, lists]);
  const cards = useSelector(state => state.cards || {});
  // console.log('\n', 'cards_board.js', cards);

  const toggleSidebar = () => {
    setOpenSideBar(!openSideBar);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
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
    await dispatch(thunkMakeList(newList));
    setNewListName("");
    toggleCreateListModal();
    dispatch(thunkBoardLists(board.id));
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    // Index === position
    // droppableId === ID
    console.log("Card_id & draggableId", draggableId)

    console.log("Old_Card.position_id & source.index", source.index)
    console.log("Old_Card.list_id & source.droppableId", source.droppableId)

    console.log("\n", "New_Card.position & destination.index", destination.index)
    console.log("New_Card.list_id & destination.droppableId", destination.droppableId)

    const cardId = draggableId
    const newListId = destination.droppableId
    const newPositionId = destination.index + 1

    const oldListId = source.droppableId
    const oldPositionId = source.index + 1



    // Dispatch an action to update the card's list and position
    dispatch(thunkMoveCard(cardId, {
      new_list_id: newListId,
      new_position_id: newPositionId,
      old_list_id: oldListId,
      old_position_id: oldPositionId
    }));
    dispatch(thunkBoardLists(board.id))
  }


  const sidebarStyle = {
    transform: openSideBar ? 'translateX(0)' : 'translateX(-100%)',
  };

  const boardContentStyle = {
    paddingLeft: openSideBar ? '2rem' : '0',
  };

  return (
    <div className="board">
      <h1>Board Testing</h1>
      <div className={`sidebar ${openSideBar ? 'open' : ''}`} style={sidebarStyle}>
        <button className="toggle-side-button" onClick={toggleSidebar}>O</button>
        {openSideBar && (
          <>
            <a href="/home">Dashboard</a>
            <a href="/members">Members</a>
            <a href="/settings">Settings</a>
          </>
        )}
      </div>
      <div className={`board-content ${openSideBar ? 'sidebar-open' : ''}`} style={boardContentStyle}>
        <h2>{board?.name}</h2>

        <DragDropContext onDragEnd={handleDragEnd}>

          <div className="lists-container" style={{ display: "flex", flexDirection: "row" }}>
            {lists.map((list) => (
              <List key={list.id} list={list} cards={cards[list.id]?.map(cardId => cards.cards[cardId])} />
            ))}
            <button className="add-list-button" onClick={toggleCreateListModal}>Add a List</button>
            {isCreateListModalOpen && (
              <div className="create-list-modal">
                <input className="create-list-input" type="text" value={newListName} onChange={handleNewListNameChange} />
                <button className="create-list-button" onClick={createList}>Create List</button>
              </div>
            )}
          </div>

        </DragDropContext>

      </div>
      <button onClick={toggleModal}>Create New Board</button>
      {isModalOpen && <BoardModal closeModal={toggleModal} />}
    </div>
  );
}

export default Board;
