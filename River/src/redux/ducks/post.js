// ACTIONS
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_POSTS = 'GET_POSTS'
export const SET_POSTS = 'SET_POSTS'
export const LIKE_POST = 'LIKE_POST'
export const REPOST = 'REPOST'
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

export const getPosts = () => ({
    type: GET_POSTS
})

export const setPosts = (data) => ({
    type: SET_POSTS,
    data: data
})

export const likePost = (id) => ({
    type: LIKE_POST,
    id
});

export const repost = (id) => ({
    type: REPOST,
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
    message: undefined,
    data: undefined
}

// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESPONSE:
            const { status, message } = action;
            return { ...state, status, message };
        case SET_POSTS:
            const { data } = action;
            return {...state, data};
        default:
            return state;
    }
};