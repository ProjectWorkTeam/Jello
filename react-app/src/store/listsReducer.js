import { csrfFetch } from "./csrf";

/*- Action Types -*/
const GET_LISTS = 'lists/GetLists';
const GET_ALL_LISTS = 'lists/GetAllLists';
const MAKE_LIST = 'lists/MakeList';
const EDIT_LIST = 'lists/EditList';
const DELETE_LIST = 'lists/DeleteList';


/*- Action Creators-*/


/*-Get All Lists-*/
export const getAllLists = (lists) => {
    return {
        type: GET_ALL_LISTS,
        lists
    }
}

/*-Get Lists by Board Id-*/
export const getBoardLists = (lists, boardId) => {
    return {
        type : GET_LISTS,
        payload : {
            lists: lists,
            boardId: boardId,
        }
    }
}

/*Make A List-*/
export const makeList = (list) => {
    return {
        type: MAKE_LIST,
        list
    }
}

/*- Edit List -*/
export const editList = (list) => {
    return {
        type: EDIT_LIST,
        list
    }
}

/*-Delete List -*/
export const deleteList = (listId) => {
    return {
        type: DELETE_LIST,
        listId
    }
}


/*-Get All Lists Thunk-*/
export const thunkAllLists = () => async (dispatch) => {
    const response = await fetch('/api/lists');
    const lists = await response.json();
    console.log('after response get all lists', lists)
    dispatch(getAllLists(lists));
}


/*-Get List by Board Id Thunk-*/
export const thunkBoardLists = (boardId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/${boardId}`);
    if (response.ok) {
        const boardLists = await response.json();
        dispatch(getBoardLists(boardLists));
        console.log('BOARD LISTS WOOOO', boardLists)
    }
}


/*-Make List Thunk -*/
export const thunkMakeList = (list) => async (dispatch) => {
    let response;
    try {
        response = await csrfFetch('/api/lists', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(list)
        });
        console.log('create list thunk reached', response)
        const listResponse = await response.json();
        dispatch(makeList(listResponse));
        console.log('new list!', listResponse);
        return listResponse;
    } catch(err) {
        console.log('before err', err);
        const errors = await err.json();
        console.log('after err', err);
        return errors;
    }
}

/*-Edit A List-*/
export const thunkEditList = (listId, list) => async (dispatch) => {
    console.log('edit list thunk reached', list)
    let response;
    try {
        response = await csrfFetch(`/api/lists/${listId}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(list)
        });
        const listToEdit = await response.json();
        console.log('before list edit thunk', listToEdit)
        dispatch(editList(listToEdit));
        console.log('after list edit thunk', listToEdit);
        return listToEdit;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

/*Delete A List Thunk-*/
export const thunkDeleteList = (listId) => async (dispatch, getState) => {
    let response;
    try {
        response = await csrfFetch(`/api/lists/${listId}`, {
            method: 'DELETE'
        });
        const deleteList = await response.json();
        dispatch(deleteList(listId));
        return deleteList;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

/*- Reducer -*/
const initialState = {
    lists : {},
}


const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_LISTS:
            return {
                ...state,
                lists: {
                    ...action.lists
                }
        };
        case GET_LISTS:
            return {
                ...state,
                lists: {
                ...state.lists,
                [action.list.id] : action.list
                }
            }
        default:
            return state;
    }
}


export default listsReducer;
