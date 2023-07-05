import React from 'react';
import Card from '../Card/Card';
import './List.css';


function List({ list, cards }) {
  
  return (
    <div className="list-container">
    <div className="list">
    <div className="list-header">
      <h3 className="list-title">{list.name}</h3>
      <h3 className="list-actions">...</h3>
      </div>
      <ul>
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </ul>
    <div className="list-footer">
      <div className="add-card">
        <a className="add-card-icon">+</a>
        <h4 className="add-card-text">Add A Card</h4>
      </div>
    </div>

    </div>
  </div>
  );
}

export default List;
