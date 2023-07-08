
/*- Action Types -*/
const GET_CARDS_BY_LIST = 'cards/getCardsByList';
const GET_CARD = 'cards/GetCard';
const MAKE_CARD = 'cards/MakeCard';
const EDIT_CARD = 'cards/EditCard';
const MOVE_CARD = "MOVE_CARD";
const DELETE_CARD = 'cards/DeleteCard';


const initialState = {
    cards: {},
}

/*-Action Creators-*/

/*-Get All Cards-*/

/*-Get Card -*/
const moveCard = (cardId, listId, positionId) => ({
    type: MOVE_CARD,
    cardId,
    listId,
    positionId,
});

export const getCard = (card) => {
    return {
        type: GET_CARD,
        card
    }
}

/*-Get Card by List-*/
const getCardsByList = (listId, cards) => ({
    type: GET_CARDS_BY_LIST,
    payload: { listId, cards },
});

/*-Make Card-*/
export const makeCard = (card) => {
    return {
        type: MAKE_CARD,
        card
    }
}

/*Edit Card*/
export const editCard = (card) => {
    return {
        type: EDIT_CARD,
        card
    }
}
/*-Delete Card-*/
export const deleteCard = (cardId, listId) => {
    return {
        type: DELETE_CARD,
        cardId,
        listId
    }
}

/*-Get Card By Id Thunk-*/
export const thunkCard = (cardId) => async (dispatch, getState) => {
    const response = await fetch(`/api/cards/${cardId}`);
    const cards = await response.json();
    dispatch(getCard(cards));
    console.log('GET CARD BY ID REACHED YAHOO', cards)
}

export const thunkMoveCard = (cardId, data) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/position`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            new_list_id: data.new_list_id,
            new_position_id: data.new_position_id,
            old_list_id: data.old_list_id,
            old_position_id: data.old_position_id
        }),
    });

    if (response.ok) {
        const { list_id, position_id } = await response.json();
        dispatch(moveCard(cardId, list_id, position_id));
        return null;
    } else {
        const errorData = await response.json();
        if (errorData.errors) {
            return errorData.errors;
        }
    }
};


/*-Get Card By List Id Thunk=*/
export const thunkGetCardsByList = (listId) => async (dispatch) => {
    const response = await fetch(`/api/cards/list/${listId}`);
    if (response.ok) {
        const cards = await response.json();
        dispatch(getCardsByList(listId, cards));
    } else {
        console.log('Error fetching cards by list');
    }
};



/*-Make Card Thunk-*/
export const thunkMakeCard = (card) => async (dispatch) => {
    let response;
    try {
        response = await fetch('/api/cards/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: card.title,
                description: card.description || '',
                list_id: card.listId,
            })
        });
        console.log('create card thunk reached', response);
        const cardResponse = await response.json();
        dispatch(makeCard(cardResponse));
        console.log('new card!', cardResponse);
        return cardResponse;
    } catch (err) {
        console.log('\n', 'ERROR CardsReducer', err, '\n')
        const errors = await err.json();
        return errors;
    }
}

/*-Edit A Card Thunk-*/
export const thunkEditCard = (cardId, card) => async (dispatch) => {
    console.log('edit card thunk reached', card);
    let response;
    try {
        response = await fetch(`/api/cards/${cardId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: card.title,
                description: card.text || '', // Use "text" property instead of "description"
                list_id: card.list_id,
            }),
        });
        const cardToEdit = await response.json();
        dispatch(editCard(cardToEdit));
        return cardToEdit;
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
};




/*Delete A Card Thunk-*/
export const thunkDeleteCard = (cardId, listId) => async (dispatch) => {
    let response;
    try {
        response = await fetch(`/api/cards/${cardId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Error deleting card");
        }
        const deleteCard = await response.json();
        dispatch(deleteCard(cardId, listId));
        return deleteCard;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}


/*-Reducer-*/


const cardsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CARDS_BY_LIST: {
            const newState = { ...state };
            const { listId, cards } = action.payload;
            cards.forEach(card => {
                newState.cards[card.id] = card;
            });
            newState[listId] = cards.map(card => card.id);
            return newState;
        }
        case GET_CARD:
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.card.id]: action.card
                }
            };
        case MOVE_CARD:
            newState = { ...state };
            const { cardId, listId, positionId } = action;
            const card = Object.values(newState.cards).find(card => card.id === cardId);
            if (card) {
                card.list_id = listId;
                card.position_id = positionId;
            }
            return newState;

        case MAKE_CARD: {
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.card.id]: action.card
                },
                [action.card.list_id]: [...state[action.card.list_id], action.card.id]
            };
        }
        case EDIT_CARD:
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.card.id]: action.card
                }
            };
        case DELETE_CARD:
            newState = { ...state };
            delete newState.cards[action.cardId];
            newState[action.listId] = newState[action.listId].filter(cardId => cardId !== action.cardId);
            return newState;
        default:
            return state;
    }
}

export default cardsReducer;
