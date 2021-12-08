export const GET_PROFILE = "GET_PROFILE";
export const SET_PROFILE = "SET_PROFILE";

export const getProfile = (id) => ({
    type: GET_PROFILE, 
    id: id
});

export const setProfile = (profile, posts) => ({
    type: SET_PROFILE, 
    profile: profile, 
    posts: posts
});

const initialState = {
   profile: undefined, 
   posts: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            const { profile, posts } = action;
            return { ...state, profile, posts };

        default:
            return state;
    }
};