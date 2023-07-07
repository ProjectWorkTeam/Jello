/*- Action Types -*/
const GET_CARDS_BY_LIST = 'cards/getCardsByList';
const GET_CARD = 'cards/GetCard';
const MAKE_CARD = 'cards/MakeCard';
const EDIT_CARD = 'cards/EditCard';
const DELETE_CARD = 'cards/DeleteCard';


const initialState = {
    cards : {},
}

/*-Action Creators-*/

/*-Get All Cards-*/

/*-Get Card -*/
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
export const deleteCard = (cardId) => {
    return {
        type: DELETE_CARD,
        cardId
    }
}

/*-Get Card By Id Thunk-*/
export const thunkCard = (cardId) => async (dispatch, getState) => {
    const response = await fetch(`/api/cards/${cardId}`);
    const cards = await response.json();
    dispatch(getCard(cards));
    console.log('GET CARD BY ID REACHED YAHOO', cards)
}


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
        response = await fetch('/api/cards', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(card)
        });
        console.log('create card thunk reached', response);
        const cardResponse = await response.json();
        dispatch(makeCard(cardResponse));
        console.log('new card!', cardResponse);
        return cardResponse;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

/*-Edit A Card Thunk-*/
export const thunkEditCard = (cardId, card) => async (dispatch) => {
    console.log('edit card thunk reached', card)
    let response;
    try {
        response = await fetch(`/api/cards/${cardId}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(card)
        });
        const cardToEdit = await response.json();
        dispatch(editCard(cardToEdit));
        return cardToEdit;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

/*Delete A Card Thunk-*/
export const thunkDeleteCard = (cardId) => async (dispatch, getState) => {
    let response;
    try {
        response = await fetch(`/api/cards/${cardId}`, {
            method: 'DELETE'
        });
        const deleteCard = await response.json();
        dispatch(deleteCard(cardId));
        return deleteCard;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

/*-Reducer-*/


const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS_BY_LIST: {
            const newState = { ...state };
            const { listId, cards } = action.payload;

            // Store each card with card id as the key
            cards.forEach(card => {
              newState.cards[card.id] = card;
            });

            // Store list of card ids for each list id
            newState[listId] = cards.map(card => card.id);

            return newState;
          }
        case GET_CARD:
            return {
                ...state,
                cards: {
                ...state.cards,
                [action.card.id] : action.card
            }
        };
        case MAKE_CARD:
            return {
                ...state,
                cards: {
                    ...action.cards
                }
        };
        case EDIT_CARD:
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.card.id]: action.card
                }
        };
        case DELETE_CARD:
            const cardToDelete = { ...state.cards };
            delete cardToDelete[action.cardId];
            return {
                ...state,
                cards: cardToDelete
        };
        default:
            return state;
    }
}


export default cardsReducer;
