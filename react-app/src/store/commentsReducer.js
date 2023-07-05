import { csrfFetch } from "./csrf";


/*-Action Types-*/
const GET_COMMENTS = 'cardComments/GetComments';
const POST_COMMENTS = 'cardComments/PostComments';
const EDIT_COMMENTS = 'cardComments/EditComments';
const DELETE_COMMENTS = 'cardComments/DeleteComments';


/*-Action Creators-*/

/*-Get Comments-*/
export const getComments = (cardComments, cardId) => {
    return {
        type: GET_COMMENTS,
        payload: {
            cardComments: cardComments,
            cardId: cardId
        }
    }
}


/*-Post Comments-*/
export const postComments = (cardComment) => {
    return {
        type: POST_COMMENTS,
        cardComment
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
