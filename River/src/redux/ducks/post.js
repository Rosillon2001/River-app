// ACTIONS
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const SET_RESPONSE = 'SET_RESPONSE'

// ACTION CREATORS
export const createPost = (formData) => ({
    type: CREATE_POST,
    formData
});

export const deletePost = (id) => ({
    type: DELETE_POST,
    id
})

export const setResponse = (status, message) => ({
    type: SET_RESPONSE,
    status: status,
    message: message
})

// REDUCER'S INITIAL STATE
const initialState = {
    status: undefined,
    message: undefined
}

// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESPONSE:
            const { status, message } = action;
            return { ...state, status, message };
        default:
            return state;
    }
};