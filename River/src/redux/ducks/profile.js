export const GET_PROFILE = "GET_PROFILE";
export const SET_PROFILE = "SET_PROFILE";
export const FOLLOW = "FOLLOW";
export const SET_RESPONSE = "SET_RESPONSE";

export const getProfile = (id) => ({
    type: GET_PROFILE, 
    id: id
});

export const setProfile = (profile, posts) => ({
    type: SET_PROFILE, 
    profile: profile, 
    posts: posts
});

export const follow = (id) => ({
    type: FOLLOW, 
    id: id
});

export const setResponse = (status, message) => ({
    type: SET_RESPONSE,
    status: status,
    message: message
})

const initialState = {
   profile: undefined, 
   posts: undefined,
   status: undefined,
   message: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            const { profile, posts } = action;
            return { ...state, profile, posts };

        case SET_RESPONSE:
            const { status, message } = action
            return { ...state, status, message }

        default:
            return state;
    }
};