
/*- Action Types -*/
const GET_ALL_BOARDS = 'boards/GetAllBoards';
const GET_BOARD = 'boards/GetBoard';
const ADD_A_BOARD = 'boards/addABoard';
const EDIT_BOARD = 'boards/editBoard';
const DELETE_BOARD = 'boards/deleteBoard';
const UPDATE_BOARD_POSITION = 'boards/updateBoardPosition';

/*- Action Creators-*/
const initialState = {
    singeBoard: {},
    boards: {},

};

/*- Get A Board-*/
export const getBoard = (board) => {
    return {
        type: GET_BOARD,
        board
    }
}

/*-Get All User Boards-*/
export const getAllBoards = (boards) => {
    return {
        type: GET_ALL_BOARDS,
        boards: boards.boards
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
        payload: boardId
    }
}

/*-Update Board Position-*/
export const updateBoardPosition = (updatedBoard) => {
    return {
        type: 'UPDATE_BOARD_POSITION',
        payload: updatedBoard,
    }
}

/*-Thunks-*/

/*-Get Board Thunk-*/
export const thunkBoard = (boardId) => async (dispatch, getState) => {
    const response = await fetch(`/api/boards/${boardId}`);
    const boards = await response.json();
    dispatch(getBoard(boards));
    console.log('GET BOARD BY ID REACHED WAHOO', boards)
}

/*-Get All Boards Thunk-*/
export const thunkAllBoards = () => async (dispatch) => {
    const response = await fetch('/api/boards');
    const boards = await response.json();
    console.log('after response get all boards', boards)
    dispatch(getAllBoards(boards));
}

/*-Add a Board Thunk-*/
export const thunkAddBoard = (board) => async (dispatch) => {
    let response;
    try {
        response = await fetch('/api/boards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)
        });
        console.log('create board thunk reached', response)
        const boardResponse = await response.json();
        dispatch(addBoard(boardResponse));
        console.log('new board!', boardResponse);
        return boardResponse;
    } catch (err) {
        console.log('before err', err);
        const errors = await err.json();
        console.log('after err', err);
        return errors;
    }
}

/*-Edit A Board Thunk-*/
export const thunkAEditBoard = (boardId, board) => async (dispatch) => {
    console.log('edit board thunk reached', board)
    try {
        const response = await fetch(`/api/boards/${boardId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const boardToEdit = await response.json();
        console.log('before board edit thunk gone through', boardToEdit);
        dispatch(editBoard(boardToEdit));
        console.log('after board edit thunk gone through', boardToEdit);

        return { payload: boardToEdit };
    } catch (err) {
        console.error('Error in thunkAEditBoard:', err);
        
        return { error: err.message };
    }
}



export const thunkADeleteBoard = (boardId) => async (dispatch) => {
    let response;
    try {
        response = await fetch(`/api/boards/${boardId}`, {
            method: 'DELETE'
        });
        const deleteBoardResponse = await response.json();
        if (response.ok) {
            dispatch(deleteBoard(boardId));
            return deleteBoardResponse;
        } else {
            throw new Error(deleteBoardResponse.message || 'Unable to delete board');
        }
    } catch (err) {
        console.error(err.message);
    }
}


// UpdateBoardPosition
export const thunkUpdateBoardPosition = (newBoardState) => async (dispatch) => {
    const response = await fetch(`/api/boards/${newBoardState.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBoardState)
    });
    const updatedBoard = await response.json();
    dispatch(updateBoardPosition(updatedBoard));
    return updatedBoard;
};


/*- Reducer -*/


const boardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARD:
            return {
                ...state,
                singleBoard: action.board
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
                    ...state.boards,
                    [action.board.id]: action.board
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
        case UPDATE_BOARD_POSITION:
            const updatedBoard = action.payload;
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [updatedBoard.id]: updatedBoard
                }
            };
        default:
            return state;
    }
}


export default boardsReducer;
