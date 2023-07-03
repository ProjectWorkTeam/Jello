// Jello/react-app/src/components/Board/Board.js
import React from 'react';
import List from "../List/List";
import './Board.css';

function Board() {
  // Can pass variables as arg or add them below here.
  const board = {
    id: 1,
    name: "Trello Test Board"
  };

  const lists = [
    { id: 1, name: "To do", board_id: 1 },
    { id: 2, name: "In Progress", board_id: 1 },
    { id: 3, name: "Completed", board_id: 1 }
  ];

  const cards = [
    { id: 1, title: "Card 1", list_id: 1 },
    { id: 2, title: "Card 2", list_id: 1 },
    { id: 3, title: "Card 3", list_id: 2 },
    { id: 4, title: "Card 4", list_id: 2 },
    { id: 5, title: "Card 5", list_id: 3 },
    { id: 6, title: "Card 6", list_id: 3 },
  ];
  if (!board) {
    return <div>Loading...</div>;
  }
  return (
    <div className="board">
      <h2>{board.name}</h2>
      <div className="lists-container">
        {/* Basic testing display structure, cards and lists should be fetched by list_id and board_id respectively */}
        {lists.map(list => (
          <List key={list.id} list={list} cards={cards.filter(card => card.list_id === list.id)} />
        ))}
      </div>
    </div>
  );
}

export default Board;
