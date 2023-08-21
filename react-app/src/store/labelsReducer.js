import { csrfFetch } from "./csrf";


/*-Action Types -*/
const GET_LABEL = 'labels/GetLabel';
const GET_ALL_LABELS = 'labels/GetAllLabels'
const POST_LABEL = 'labels/PostLabel';
const EDIT_LABEL = 'labels/EditLabel';
const DELETE_LABEL = 'labels/DeleteLabel';


/*-Action Creators-*/

/*-Get Label By Id-*/
export const getLabel = (label) => {
    return {
        type: GET_LABEL,
        label
    }
}

/*-Get All Labels-*/
export const getAllLabels = (labels) => {
    return {
        type: GET_ALL_LABELS,
        labels
    }
}

/*-Post Label-*/
export const postLabel = (label) => {
    return {
        type: POST_LABEL,
        label
    }
}

/*-Edit Label-*/
export const editLabel = (label) => {
    return {
        type: EDIT_LABEL,
        label
    }
}

/*-Delete Label-*/
export const deleteLabel = (labelId) => {
    return {
        type: DELETE_LABEL,
        labelId
    }
}

/*-Thunks-*/


/*-Get All Labels-*/
export const thunkAllLabels = () => async (dispatch) => {
    const response = await fetch('/api/labels');
    const labels = await response.json();
    dispatch(getAllLabels(labels));
}


/*-Get Label by Id-*/
export const thunkLabel = (labelId) => async (dispatch) => {
    const response = await csrfFetch(`/api/labels/${labelId}`);
    const label = await response.json();
    dispatch(getLabel(label))
};


/*-Post Label-*/
export const thunkPostLabel = (label) => async (dispatch) => {
    let response;
    try {
        response = await csrfFetch('/api/labels', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(label)
        })
        const labelResponse = await response.json();
        dispatch(postLabel(labelResponse));
        return labelResponse;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

/*-Edit A Label-*/
export const thunkEditLabel = (labelId, label) => async (dispatch) => {
    let response;
    try {
        response = await csrfFetch(`/api/labels/${labelId}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(label)
        })
        const labelToEdit = await response.json();
        dispatch(editLabel(labelToEdit));
        return labelToEdit;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

/*-Delete Label Thunk-*/
export const thunkDeleteLabel = (labelId) => async (dispatch, getState) => {
    let response;
    try {
        response = await csrfFetch(`/api/labels/${labelId}`, {
            method: 'DELETE'
        });
        const labelToDelete = await response.json();
        dispatch(deleteLabel(labelId));
        return labelToDelete;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}


/*-Reducer -*/
const initialState = {
    labels : {}
}

const labelsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_LABELS:
            return {
                ...state,
                labels: {
                    ...action.labels
                }
         };
        case GET_LABEL:
            return {
                ...state,
                labels: {
                    ...state.labels,
                    [action.label.id]: action.label
             }
        };
        case POST_LABEL:
            return {
                ...state,
                labels: {
                    ...action.labels
                }
        };
        case EDIT_LABEL:
            return {
                ...state,
                labels: {
                    ...state.labels,
                    [action.label.id]: action.label
                }
        };
        case DELETE_LABEL:
            const labelToDelete = { ...state.labels };
            delete labelToDelete[action.labelId];
            return {
                ...state,
                labels: labelToDelete
        };
        default :
            return state;
    }
}


export default labelsReducer;
