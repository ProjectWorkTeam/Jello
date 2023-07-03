import React from 'react';
import Card from '../Card/Card';
import './List.css';

function List({ list, cards }) {
  return (
    <div className="list">
      <h3>{list.name}</h3>
      <ul>
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </ul>
    </div>
  );
}

export default List;
