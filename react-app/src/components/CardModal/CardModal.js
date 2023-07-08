// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { thunkCard } from '../../store/cardsReducer';
// import './CardModal.css';

// const CardModal = ({ cardId }) => {
//     const dispatch = useDispatch();
//     const card = useSelector(state => state.cards.cards[cardId]);
//     const [isEdit, setIsEdit] = useState(false);
//     const [cardName, setCardName] = useState('');
//     const [cardText, setCardText] = useState('');

//     useEffect(() => {
//         if (card) {
//             setCardName(card.title);
//             setCardText(card.text);
//         }
//     }, [card]);

//     const handleCardTitleClick = () => {
//         setIsEdit(true);
//     };

//     const handleCardNameChange = (e) => {
//         setCardName(e.target.value);
//     };

//     const handleCardTextChange = (e) => {
//         setCardText(e.target.value);
//     };

//     const handleCardSave = () => {
//         dispatch(thunkCard(cardId, { title: cardName, text: cardText }));
//         setIsEdit(false);
//     };

//     if (!card) {
//         return null;
//     }

//     return (
//         <div className="card-modal-container">
//             <div className="card-modal" onClick={(e) => e.stopPropagation()}>
//                 {isEdit ? (
//                     <div>
//                         <input
//                             type="text"
//                             value={cardName}
//                             onChange={handleCardNameChange}
//                             onBlur={handleCardSave}
//                         />
//                         <textarea
//                             value={cardText}
//                             onChange={handleCardTextChange}
//                             onBlur={handleCardSave}
//                         />
//                     </div>
//                 ) : (
//                     <div>
//                         <h2 id="card-title" onClick={handleCardTitleClick}>
//                             {card.title}
//                         </h2>
//                         <p id="card-text" onClick={handleCardTitleClick}>
//                             {card.text}
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CardModal;
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { thunkCard, thunkEditCard } from '../../store/cardsReducer';
// import './CardModal.css';

// const CardModal = ({ cardId }) => {
//     const dispatch = useDispatch();
//     const card = useSelector((state) => state.cards.cards[cardId]);
//     const [isEdit, setIsEdit] = useState(false);
//     const [cardName, setCardName] = useState('');
//     const [cardText, setCardText] = useState('');

//     useEffect(() => {
//         if (card) {
//             setCardName(card.title);
//             setCardText(card.text);
//         }
//     }, [card]);

//     const handleCardTitleClick = () => {
//         setIsEdit(true);
//     };

//     const handleCardNameChange = (e) => {
//         setCardName(e.target.value);
//     };

//     const handleCardTextChange = (e) => {
//         setCardText(e.target.value);
//     };

//     const handleCardSave = () => {
//         if (isEdit) {
//             const editedCard = { id: cardId, title: cardName, text: cardText, list_id: card.list_id };
//             dispatch(thunkEditCard(cardId, editedCard));
//         } else {
//             dispatch(thunkCard(cardId));
//         }
//         setIsEdit(false);
//     };

//     if (!card) {
//         return null;
//     }

//     return (
//         <div className="card-modal-container">
//             <div className="card-modal" onClick={(e) => e.stopPropagation()}>
//                 {isEdit ? (
//                     <div>
//                         <input
//                             type="text"
//                             value={cardName}
//                             onChange={handleCardNameChange}
//                             onBlur={handleCardSave}
//                         />
//                         <textarea
//                             value={cardText}
//                             onChange={handleCardTextChange}
//                             onBlur={handleCardSave}
//                         />
//                         <button onClick={handleCardSave}>Save</button>
//                     </div>
//                 ) : (
//                     <div>
//                         <h2 id="card-title" onClick={handleCardTitleClick}>
//                             {card.title}
//                             <i className="fa-solid fa-pen-to-square" />
//                         </h2>
//                         <p id="card-text" onClick={handleCardTitleClick}>
//                             {card.text}
//                             <i className="fa-solid fa-pen-to-square" />
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CardModal;

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
        if (isEdit) {
            const editedCard = { id: cardId, title: cardName, text: cardText, list_id: card.list_id };
            dispatch(thunkEditCard(cardId, editedCard));
        } else {
            dispatch(thunkCard(cardId));
        }
        setIsEdit(false);
    };

    if (!card) {
        return null;
    }

    return (
        <div className="card-modal-container">
            <div className="card-modal" onClick={(e) => e.stopPropagation()}>
                {isEdit ? (
                    <div>
                        <div>
                            <input
                                type="text"
                                value={cardName}
                                onChange={handleCardNameChange}
                                onBlur={handleCardSave}
                            />
                        </div>
                        <div>
                            <textarea
                                value={cardText}
                                onChange={handleCardTextChange}
                                onBlur={handleCardSave}
                            />
                        </div>
                        <button onClick={handleCardSave}>Save</button>
                    </div>
                ) : (
                    <div>
                        <h2 id="card-title" onClick={handleCardTitleClick}>
                            {card.title}
                            <i className="fa-solid fa-pen-to-square" />
                        </h2>
                        <div>Description</div>
                        <p id="card-text" onClick={handleCardTitleClick}>
                            {card.text}
                            <i className="fa-solid fa-pen-to-square" />
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardModal;
