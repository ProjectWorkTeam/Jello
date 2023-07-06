  import React, { useState } from 'react';
  import { useParams } from "react-router-dom";
  import List from '../List/List';
  import BoardModal from '../BoardModal/BoardModal';
  import './Board.css';
  import CardModal from '../CardModal/CardModal';


  function Board() {
    const { boardid } = useParams(); // this is the boardid pulled from url paremeter, we can use it to hit our database.
    const [openSideBar, setOpenSideBar] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCreateListModalOpen, setCreateListModalOpen] = useState(false);
    const [newListName, setNewListName] = useState("");

    // for Boards/Lists/Comments etc, we're gonna need to pull and send to our db and manage state with redux useSelector
    const [lists, setLists] = useState([
      { id: 1, name: 'To do', board_id: 1 },
      { id: 2, name: 'In Progress', board_id: 1 },
      { id: 3, name: 'Completed', board_id: 1 },
    ]);
    // const [selectCard, setSelectCard] = useState(null);

    const board = {
      id: 1,
      name: 'Trello Test Board',
    };

    const cards = [
      { id: 1, title: 'Card 1', list_id: 1 },
      { id: 2, title: 'Card 2', list_id: 1 },
      { id: 3, title: 'Card 3', list_id: 2 },
      { id: 4, title: 'Card 4', list_id: 2 },
      { id: 5, title: 'Card 5', list_id: 3 },
      { id: 6, title: 'Card 6', list_id: 3 },
    ];

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

    // const openCardModal = (cardId) => {
    //   setSelectCard(cardId);
    // }

    const createList = () => {
      if (newListName.trim() === '') {
        // Handle error case
        return;
      }
      const newList = {
        id: lists.length + 1,
        name: newListName,
        board_id: 1,
      };
      setLists([...lists, newList]);
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
        <div className="sidebar" style={sidebarStyle}>
          <button onClick={toggleSidebar}>Toggle Side Bar</button>
          {openSideBar && (
            <>
              <a href="/boards">Boards</a>
              <a href="/members">Members</a>
              <a href="/settings">Settings</a>
            </>
          )}
        </div>
        <div className="board-content" style={boardContentStyle}>
          <h2>{board.name}</h2>
          <div className="lists-container">
            {lists.map((list) => (
              <List key={list.id}
              list={list}
              cards={cards.filter((card) => card.list_id === list.id)}
              />
            ))}
            <button onClick={toggleCreateListModal}>Add a List</button>
            {isCreateListModalOpen && (
              <div className="create-list-modal">
                <input type="text" value={newListName} onChange={handleNewListNameChange} />
                <button onClick={createList}>Create List</button>
              </div>
            )}
          </div>
          <button onClick={toggleModal}>Create Board</button>
          {isModalOpen && <BoardModal closeModal={toggleModal} />}

        </div>
      </div>
    );
  }

  export default Board;
