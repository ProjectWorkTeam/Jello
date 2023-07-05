import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkCard, thunkCardList, thunkEditCard } from '../../store/cardsReducer';
import { useModal } from '../../context/Modal';
import './CardModal.css';

const CardModal = () => {
    const { cardId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const card = useSelector(state => state.cards.cards[cardId]);
    const [isEdit, setIsEdit] = useState(false);
    const [cardName, setCardName] = useState(card ? card.name :  '');
    const [cardText, setCardText] = useState(card ? card.text : '');


    const handleCardTitleClick = () => {
        setIsEdit(true);
    }

    const handleCardNameChange = (e) => {
        setCardName(e.target.value);
    };

    const handleCardTextChange = (e) => {
        setCardText(e.target.value);
    }

    const handleCardSave = (e) => {
        dispatch(thunkEditCard(cardId, { name: cardName, description: cardText}));
        setIsEdit(false);
    }


    return (
        <div id="card-modal">
            <div id="card-modal-background"> </div>
            <div id="card-modal-content">
                {isEdit ? (
                <div>
                    <input
                        type="text"
                        value={cardName}
                        onChange={handleCardNameChange}
                        onBlur={handleCardSave}
                    />
                    <textarea
                        value={cardText}
                        onChange={handleCardTextChange}
                        onBlur={handleCardSave}
                    />
                </div>
                ) : (
                <div>
                 <h2 id="card-title" onClick={handleCardTitleClick}>
                    {card.title}
                </h2>
                <p id="card-text" onClick={handleCardTitleClick}>
                    {card.text}
                </p>
                </div>
            )}
            </div>
        </div>
    )
}

export default CardModal;
