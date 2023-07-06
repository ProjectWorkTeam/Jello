import { csrfFetch } from "./csrf";


/*-Action Types-*/
const GET_COMMENTS = 'cardComments/GetComments';
const GET_ALL_COMMENTS = 'cardComments/GetAllComments';
const POST_COMMENTS = 'cardComments/PostComments';
const EDIT_COMMENTS = 'cardComments/EditComments';
const DELETE_COMMENTS = 'cardComments/DeleteComments';


/*-Action Creators-*/

/*-Get Comments-*/
export const getComments = (cardComments, cardId) => {
    return {
        type: GET_COMMENTS,
        payload: {
            cardComment: cardComments,
            cardId: cardId
        }
    }
}


/*-Get All Comments-*/
export const getAllComments = (cardComments) => {
    return {
        type: GET_ALL_COMMENTS,
        cardComments
    }
}

/*-Post Comments-*/
export const postComments = (cardComment) => {
    return {
        type: POST_COMMENTS,
        cardComment
    }
}


/*-Edit Comment-*/
export const editComments = (cardComment) => {
    return {
        type: EDIT_COMMENTS,
        cardComment
    }
}

/*-Delete Comment-*/
export const deleteComments = (cardCommentId) => {
    return {
        type: DELETE_COMMENTS,
        cardCommentId
    }
}




/*-Get Comments Thunk-*/
export const thunkComments = (cardId) => async (dispatch) => {
    const response = await csrfFetch(`/api/cardComments${cardId}`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(getComments(comments));
        console.log('Comments from Card', comments)
    }
}

/*-Get All Comments Thunk-*/
export const thunkAllComments = () => async (dispatch) => {
    const response = await fetch('/api/cardComments');
    const comments = await response.json();
    console.log('after response get all comments', comments);
    dispatch(getAllComments(comments));
}


/*-Post Comments Thunk-*/
export const thunkPostComments = (cardComment) => async (dispatch) => {
    let response;
    try {
        response = await csrfFetch('/api/cardComments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardComment)
        });
        console.log('post comment thunk reached', response);
        const commentResponse = await response.json();
        dispatch(postComments(commentResponse));
        console.log('new comment!', commentResponse);
        return commentResponse;
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
}

/*-Edit Comments Thunk-*/
export const thunkEditComments = (cardCommentId, cardComment) => async (dispatch) => {
    console.log('edit comment thunk reached', cardComment)
    let response;
    try {
        response = await fetch(`/api/cardComments/${cardCommentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardComment)
        });
        const commentToEdit = await response.json();
        dispatch(editComments(commentToEdit));
        return commentToEdit;
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
}

/*-Delete A Comment Thunk-*/
export const thunkDeleteCard = (cardCommentId) => async (dispatch, getState) => {
    let response;
    try {
        response = await fetch(`/api/cardComments/${cardCommentId}`, {
            method: 'DELETE'
        });
        const deleteComent = await response.json();
        dispatch(deleteComments(cardCommentId));
        return deleteComent;
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
}


/*-Reducer-*/
const initialState = {
    cardComments: {},
}


const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS:
            return {
                ...state,
                cardComments: {
                    ...action.cardComments
                }
            };
        case GET_COMMENTS:
            return {
                ...state,
                cardComments: {
                    ...state.cardComments,
                    [action.payload.cardComment.id]: action.payload.cardComment
                }
            };
        case POST_COMMENTS:
            return {
                ...state,
                cardComments: {
                    ...state.cardComments,
                    [action.cardComment.id]: action.cardComment
                }
            };
        case EDIT_COMMENTS:
            return {
                ...state,
                cardComments: {
                    ...state.cardComments,
                    [action.cardComment.id]: action.cardComment
                }
            };
        case DELETE_COMMENTS:
            const commentsToDelete = { ...state.cardComments };
            delete commentsToDelete[action.cardCommentId];
            return {
                ...state,
                cardComments: commentsToDelete
            }
        default:
            return state;
    }
}

export default commentsReducer;
