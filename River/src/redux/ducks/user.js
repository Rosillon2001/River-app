export const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const GET_USER_POSTS = 'GET_USER_POSTS'
export const SET_USER_POSTS = 'SET_USER_POSTS'
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

export const getUserPosts = () => ({
    type: GET_USER_POSTS
})

export const setResponse = (status, message) => ({
    type: SET_RESPONSE,
    status: status,
    message: message
})

export const setUserPosts = (posts) => ({
    type: SET_USER_POSTS,
    posts: posts
})

const initialState = {
    user: undefined,
    status: undefined,
    message: undefined,
    posts: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const { user } = action;
            return { ...state, user };

        case SET_RESPONSE:
            const { status, message } = action
            return { ...state, status, message }

        case SET_USER_POSTS:
            const { posts } = action
            return { ...state, posts }
        default:
            return state;
    }
};