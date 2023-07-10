/*- Action Types -*/
const GET_LISTS = 'lists/GetLists';
const MAKE_LIST = 'lists/MakeList';
const EDIT_LIST = 'lists/EditList';
const DELETE_LIST = 'lists/DeleteList';

const initialState = {
  lists: {},
}

/*- Action Creators -*/

/*-Get Lists by Board Id-*/
export const getBoardLists = (lists, boardId) => {
  return {
    type: GET_LISTS,
    payload: {
      lists: {
        [boardId]: lists,
      }
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


/*- Thunk Functions -*/

/*-Get List by Board Id Thunk-*/
export const thunkBoardLists = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/lists/board/${boardId}`);
  if (response.ok) {
    const boardLists = await response.json();
    dispatch(getBoardLists(boardLists.lists, boardId));
    console.log('\n', 'List Reducer ThunkBoardLists', boardLists, '\n')
    return boardLists
  }
}


/*-Make List Thunk -*/
export const thunkMakeList = (list) => async (dispatch) => {
  let response;
  try {
    response = await fetch('/api/lists/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        list_name: list.list_name,
        board_id: list.board_id
      })
    });
    const listResponse = await response.json();
    dispatch(makeList(listResponse));
    return listResponse;
  } catch (err) {
    return
  }
}

/*-Edit A List-*/
export const thunkEditList = (listId, list) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`/api/lists/${listId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        list_name: list.list_name,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const listToEdit = await response.json();
    dispatch(editList(listToEdit));
    return listToEdit;
  } catch (err) {
    console.error(err);  // changed this line as well for better error visibility
    return;
  }
}


/*-Delete A List Thunk-*/
export const thunkDeleteList = (listId) => async (dispatch) => {
  let response;
  try {
      response = await fetch(`/api/lists/${listId}`, {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const deleteList = await response.json();
      dispatch(deleteList(listId));
      return deleteList;
  } catch (err) {
      console.error('There was an error deleting the list:', err.toString());
  }
}



/*- Reducer -*/


const listsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LISTS:
      newState = { ...state, lists: { ...state.lists, ...action.payload.lists } };
      return newState;
    case MAKE_LIST:
      newState = { ...state };
      newState.lists[action.list.boardId] = [...newState.lists[action.list.boardId], action.list];
      return newState;
      case EDIT_LIST:
        newState = { ...state };
        if (newState.lists[action.list.boardId]) {
          newState.lists[action.list.boardId] = newState.lists[action.list.boardId].map(list =>
            list.id === action.list.id ? action.list : list
          );
        }
        return newState;
    case DELETE_LIST:
      newState = { ...state };
      for (const boardId in newState.lists) {
        newState.lists[boardId] = newState.lists[boardId].filter(list => list.id !== action.listId);
      }
      return newState;
    default:
      return state;
  }
}

export default listsReducer;
