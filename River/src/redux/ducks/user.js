export const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_RESPONSE = "SET_RESPONSE";

export const getUser = () => ({
    type: GET_USER
});

export const setUser = (user) => ({
    type: SET_USER,
    user: user
});

export const updateUser = (formData) => ({
    type: UPDATE_USER,
    formData: formData
})

export const deleteUser = () => ({
    type: DELETE_USER
})

export const setResponse = (status, message) => ({
    type: SET_RESPONSE,
    status: status,
    message: message
})

const initialState = {
    user: undefined,
    status: undefined,
    message: undefined,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const { user } = action;
            return { ...state, user };

        case SET_RESPONSE:
            const { status, message } = action
            return { ...state, status, message }

        default:
            return state;
    }
};