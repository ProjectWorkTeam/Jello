import { csrfFetch } from "./csrf";

/*- Action Types -*/
const GET_USER_BOARD = 'boards/GetUserBoard';
const GET_ALL_BOARDS = 'boards/GetAllBoards';
const GET_BOARD = 'boards/GetBoard';
const ADD_A_BOARD = 'boards/addABoard';
const EDIT_BOARD = 'boards/editBoard';
const DELETE_BOARD = 'boards/deleteBoard';
const UPDATE_BOARD_POSITION = 'boards/updateBoardPosition';

/*- Action Creators-*/

/*-Get User Boards-*/
export const getUserBoard = (userId) => {
    return {
        type: GET_USER_BOARD,
        userId
    }
}

/*- Get A Board-*/
export const getBoard = (board) => {
    return {
        type: GET_BOARD,
        board
    }
}

/*-Get All Boards-*/
export const getAllBoards = (boards) => {
    return {
        type: GET_ALL_BOARDS,
        boards
    }
}

/*-Add A Board-*/
export const addBoard = (board) => {
    return {
        type: ADD_A_BOARD,
        board
    }
}

/*-Edit A Board-*/
export const editBoard = (board) => {
    return {
        type: EDIT_BOARD,
        board
    }
}


/*-Delete A Board-*/
export const deleteBoard = (boardId) => {
    return {
        type: DELETE_BOARD,
        boardId
    }
}

/*-Update Board Position-*/
export const updateBoardPosition = (board) => {
    return {
        type: UPDATE_BOARD_POSITION,
        board
    }
}
/*-Thunks-*/


/*-Get User Boards Thunk -*/
// export const thunkAUserBoards = (userId) => async (dispatch) => {
//    const response = await csrfFetch(`/api/boards/${userId}`);
//    if (response.ok) {
//     const userBoards = await response.json();
//     dispatch(getUserBoard(userBoards));
//     console.log('GET USER BOARDS REACHED WOOOO', userBoards)
//    }
// }

/*-Get All Boards Thunk-*/
export const thunkAllBoards = () => async (dispatch) => {
    const response = await csrfFetch('/api/boards');
    const boards = await response.json();
    console.log('after response get all boards', boards)
    dispatch(getAllBoards(boards));
}

/*-Get Board Thunk-*/
export const thunkBoard = (boardId) => async (dispatch, getState) => {
    const response = await fetch(`/api/boards/${boardId}`);
    const boards = await response.json();
    dispatch(getBoard(boards));
    console.log('GET BOARD BY ID REACHED WAHOO', boards)
}


/*-Add a Board Thunk-*/
export const thunkAddBoard = (board) => async (dispatch) => {
    let response;
    try {
        response = await csrfFetch('/api/boards', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(board)
        });
        console.log('create board thunk reached', response)
        const boardResponse = await response.json();
        dispatch(addBoard(boardResponse));
        console.log('new board!', boardResponse);
        return boardResponse;
    } catch(err) {
        console.log('before err', err);
        const errors = await err.json();
        console.log('after err', err);
        return errors;
    }
}

/*-Edit A Board Thunk-*/
export const thunkAEditBoard = (boardId, board) => async (dispatch) => {
    console.log('edit board thunk reached', board)
    let response;
    try {
        response = await csrfFetch(`/api/boards/${boardId}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(board)
        });
        const boardToEdit = await response.json();
        console.log('before board edit thunk gone through', boardToEdit);
        dispatch(editBoard(boardToEdit));
        console.log('after board edit thunk gone through', boardToEdit);
        return boardToEdit;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}


/*Delete A Board Thunk-*/
export const thunkADeleteBoard = (boardId) => async (dispatch, getState) => {
    let response;
    try {
        response = await csrfFetch(`/api/boards/${boardId}`, {
            method: 'DELETE'
        });
        const deleteBoard = await response.json();
        dispatch(deleteBoard(boardId));
        return deleteBoard;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

// UpdateBoardPosition
export const thunkUpdateBoardPosition = (boardId, newPosition) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/boards/${boardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPosition),
        });

        if (!response.ok) {
            throw new Error('Failed to update the board position');
        }

        const updatedBoard = await response.json();

        dispatch(updateBoardPosition(updatedBoard));
    } catch (error) {
        console.error(error);
    }
};
/*- Reducer -*/
const initialState = {
    boards: {},

};

const boardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BOARD:
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.board.id] : action.board
                }
            }
        case GET_BOARD:
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.board.id] : action.board
                }
            }
        case GET_ALL_BOARDS:
            return {
                ...state,
                boards: {
                    ...action.boards
                }
        };
        case ADD_A_BOARD:
            return {
                ...state,
                boards: {
                    ...action.boards
                }
        };
        case EDIT_BOARD:
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.board.id]: action.board
                }
        };
        case DELETE_BOARD:
            const boardToDelete = { ...state.boards };
            delete boardToDelete[action.boardId];
            return {
                ...state,
                boards: boardToDelete
        };
        case UPDATE_BOARD_POSITION: {
            const updatedBoard = action.board;
            return {
              ...state,
              boards: {
                ...state.boards,
                [updatedBoard.id]: updatedBoard,
              },
            };
          }

        default:
            return state;
    }
}


export default boardsReducer;
