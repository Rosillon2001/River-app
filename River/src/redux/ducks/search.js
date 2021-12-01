export const PERFORM_SEARCH = 'PERFORM_SEARCH'
const SET_SEARCH_DATA = 'SET_SEARCH_DATA'

export const performSearch = (keyword) => ({
    type: PERFORM_SEARCH,
    keyword
});

export const setSearchData = (data, keyword) => ({
    type: SET_SEARCH_DATA,
    data: data,
    keyword: keyword
})

const initialState = {
    data: undefined,
    keyword: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_DATA:
            const { data, keyword } = action;
            return { ...state, data, keyword };
        default:
            return state;
    }
};