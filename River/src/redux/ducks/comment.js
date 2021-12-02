// ACTIONS
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const SET_COMMENTS = 'SET_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SET_RESPONSE = 'SET_RESPONSE'

// ACTION CREATIONS
export const getPostComments = (id) => ({
    type: GET_POST_COMMENTS,
    id
})

export const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments
})

export const createComment = (id, content) => ({
    type: CREATE_COMMENT,
    id,
    content
})

export const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
})

export const setResponse = (status, message) => ({
    type: SET_RESPONSE,
    status: status,
    message: message
})

// REDUCER'S INITIAL STATE
const initialState = {
    comments: undefined,
    status: undefined,
    message: undefined
}

// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESPONSE:
            const { status, message } = action;
            return { ...state, status, message };
        case SET_COMMENTS:
            const { comments } = action;
            return {...state, comments};
        default:
            return state;
    }
};