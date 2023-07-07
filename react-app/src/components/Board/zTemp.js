





  return (
    <div className="board">
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
        <h2>{board.name}</h2>
        <div className="lists-container">
          {lists.map((list) => (
            <List key={list.id} list={list} cards={cards.filter((card) => card.list_id === list.id)} />
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
