import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCard, thunkEditCard } from '../../store/cardsReducer';
import './CardModal.css';

const CardModal = ({ cardId }) => {
    const dispatch = useDispatch();
    const card = useSelector((state) => state.cards.cards[cardId]);
    const [isEdit, setIsEdit] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardText, setCardText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (card) {
            setCardName(card.title);
            setCardText(card.text);
        }
    }, [card]);

    const handleCardTitleClick = () => {
        setIsEdit(true);
    };

    const handleCardNameChange = (e) => {
        setCardName(e.target.value);
    };

    const handleCardTextChange = (e) => {
        setCardText(e.target.value);
    };

    const handleCardSave = () => {
        if (cardName.trim() === '') {
            setErrorMessage('Please enter a name for the card.');
            return;
        }

        // Add validation check for title length
        if (cardName.length > 20) {
            setErrorMessage('Title cannot be more than 20 characters long');
            return;
        }

        if (isEdit) {
            const editedCard = { id: cardId, title: cardName, text: cardText, list_id: card.list_id };
            dispatch(thunkEditCard(cardId, editedCard));
        } else {
            dispatch(thunkCard(cardId));
        }
        setIsEdit(false);
        setErrorMessage(''); // Clear the error message
    };


    if (!card) {
        return null;
    }

    return (
        <div className="card-modal-container">
            <div className="card-modal" onClick={(e) => e.stopPropagation()}>
                {isEdit ? (
                    <div className="card-modal-edit">
                        {errorMessage && <div id='error'>{errorMessage}</div>}
                        <div>
                            <input
                                type="text"
                                value={cardName}
                                onChange={handleCardNameChange}
                                onBlur={handleCardSave}
                                className="card-modal-edit-input"
                            />
                        </div>
                        <div>
                            <textarea
                                value={cardText}
                                onChange={handleCardTextChange}
                                onBlur={handleCardSave}
                                className="card-modal-edit-textarea"
                                placeholder='Enter a description...'
                                id="card-textarea"
                            />
                        </div>
                        <button onClick={handleCardSave}>Save</button>
                    </div>
                ) : (
                    <div className="card-modal-contents">
                        <h2 id="card-title" onClick={handleCardTitleClick}>
                            <i class="fa-solid fa-newspaper" id="title-icon"></i>
                            {card.title}
                            <i className="fa-solid fa-pen-to-square icon" id="edit-icon" />
                        </h2>
                        <div className='card-modal-description'></div>
                        <p id="card-text" onClick={handleCardTitleClick}>
                            <i class="fa-solid fa-bars" id="description-icon"></i>
                            Description
                            {/* {card.text} */}
                            <i className="fa-solid fa-pen-to-square icon" id="edit-icon" />
                        </p>
                        <div className='modal-card-text'>
                            {card.text}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardModal;
