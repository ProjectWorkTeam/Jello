import { csrfFetch } from "./csrf";


/*- Action Types -*/
const GET_CARDS_LIST = 'cards/GetCardsList';
const GET_ALL_CARDS = 'cards/GetAllCards';
const GET_CARD = 'cards/GetCard';
const MAKE_CARD = 'cards/MakeCard';
const EDIT_CARD = 'cards/EditCard';
const DELETE_CARD = 'cards/DeleteCard';


/*-Action Creators-*/


/*-Get All Cards-*/
export const getAllCards = (cards) => {
    return {
        type: GET_ALL_CARDS,
        cards
    }
}

/*-Get Card -*/
export const getCard = (card) => {
    return {
        type: GET_CARD,
        card
    }
}

/*-Get Card by List-*/
export const getCardLists = (cards, listId) => {
    return {
        type: GET_CARDS_LIST,
        payload: {
            cards: cards,
            listId: listId
        }
    }
}

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

/*-Get All Cards-*/
export const thunkAllCards = () => async (dispatch) => {
    const response = await fetch('/api/cards');
    const cards = await response.json();
    console.log('after response get all cards', cards)
    dispatch(getAllCards(cards));
}

/*-Get Card By Id Thunk-*/
export const thunkCard = (cardId) => async (dispatch, getState) => {
    const response = await fetch(`/api/cards/${cardId}`);
    const cards = await response.json();
    dispatch(getCard(cards));
    console.log('GET CARD BY ID REACHED YAHOO', cards)
}


/*-Get Card By List Id Thunk=*/
export const thunkCardList = (listId) => async (dispatch) => {
    const response = await csrfFetch(`/api/cards/${listId}`);
    if (response.ok) {
        const cardLists = await response.json();
        dispatch(getCardLists(cardLists));
        console.log('CARD LISTS', cardLists)
    }
}

/*-Make Card Thunk-*/
export const thunkMakeCard = (card) => async (dispatch) => {
    let response;
    try {
        response = await csrfFetch('/api/cards', {
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
        response = await csrfFetch(`/api/cards/${cardId}`, {
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
        response = await csrfFetch(`/api/cards/${cardId}`, {
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
const initialState = {
    cards : {},
}


const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CARDS:
            return {
                ...state,
                cards: {
                    ...action.cards
                }
        };
        case GET_CARD:
            return {
                ...state,
                cards: {
                ...state.cards,
                [action.card.id] : action.card
            }
        }
        default:
            return state;
    }
}


export default cardsReducer;
