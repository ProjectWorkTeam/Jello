import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkCard, thunkCardList, thunkEditCard } from '../../store/cardsReducer';
import { useModal } from '../../context/Modal';
import './CardModal.css';

const CardModal = ({cardId, closeModal}) => {


    const dispatch = useDispatch();
    const history = useHistory();
    const card = useSelector(state => state.cards.cards.find(card => card.id === cardId));
    const [isEdit, setIsEdit] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardText, setCardText] = useState('');


    useEffect(() => {
        if (card) {
          setCardName(card.title);
          setCardText(card.text);
        }
      }, [card]);


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
        dispatch(thunkEditCard(cardId, { title: cardName, text: cardText}));
        setIsEdit(false);
    }

    const handleCloseModal = () => {
        closeModal();
    }

    if (!card) {
        return null;
    }


    return (
        <div className="card-modal-container">
            <div className="card-modal" onClick={(e) => e.stopPropagation()}>
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
                 <h2 id="card-title">
                    {card.title}
                </h2>
                <p id="card-text">
                    {card.text}
                </p>
                </div>
            )}
            </div>
            <button onClick={handleCloseModal}>Close</button> 
        </div>
    )
}

export default CardModal;
