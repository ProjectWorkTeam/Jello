import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAllBoards } from '../../store/boardsReducer';
import { thunkBoardLists, thunkMakeList } from '../../store/listsReducer';
import { thunkGetCardsByList } from '../../store/cardsReducer';
import List from '../List/List';
import BoardModal from '../BoardModal/BoardModal';
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
  console.log('\n', 'Board_board.js', board);
  useEffect(() => {
    if (board && board.id) {
      dispatch(thunkBoardLists(board.id));
    }
  }, [dispatch, board]);
  const lists = useSelector(state => state.lists.lists[parseInt(boardid, 10)] || []);
  console.log('\n', 'lists_board.js', lists);
  useEffect(() => {
    lists.forEach(list => {
      dispatch(thunkGetCardsByList(list.id));
    });
  }, [dispatch, lists]);
  const cards = useSelector(state => state.cards || {});
  console.log('\n', 'cards_board.js', cards);

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

  const createList = () => {
    if (newListName.trim() === '') {
      // Handle error case
      return;
    }
    const newList = {
      id: lists.length + 1,
      name: newListName,
      board_id: board.id,
    };
    dispatch(thunkMakeList(newList));
    setNewListName("");
    toggleCreateListModal();
  };

  const sidebarStyle = {
    transform: openSideBar ? 'translateX(0)' : 'translateX(-100%)',
  };

  const boardContentStyle = {
    marginLeft: openSideBar ? '0' : '250px',
  };

  return (
    <div className="board">
      <h1>Board Testing</h1>
      <div className="sidebar" style={sidebarStyle}>
        <button onClick={toggleSidebar}>Toggle Side Bar</button>
        {openSideBar && (
          <>
            <a href="/home">Dashboard</a>
            <a href="/members">Members</a>
            <a href="/settings">Settings</a>
          </>
        )}
      </div>
      <div className="board-content" style={boardContentStyle}>
        <h2>{board?.name}</h2>
        <div className="lists-container" style={{ display: "flex", flexDirection: "row" }}>
          {lists.map((list) => (
            <List key={list.id} list={list} cards={cards[list.id]?.map(cardId => cards.cards[cardId])} />
          ))}
        </div>
        <div className="create-list-modal">
              <input type="text" value={newListName} onChange={handleNewListNameChange} />
              <button onClick={createList}>Create List</button>
            </div>
      </div>
      <button onClick={toggleModal}>Create New Board</button>
      {isModalOpen && <BoardModal closeModal={toggleModal} />}
    </div>
  )
}
export default Board;
