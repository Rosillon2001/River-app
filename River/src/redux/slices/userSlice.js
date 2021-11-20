import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    email: null,
    name: null,
    bio: null,
    location: null,
    birthDate: null,
    picture: null,
    dateCreated: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                name: action.payload.name,
                bio: action.payload.bio,
                location: action.payload.location,
                birthDate: action.payload.birthDate,
                picture: action.payload.picture,
                dateCreated: action.payload.dateCreated
            }
        },
        removeUser: (state) => {
            return {
                ...state,
                id: null,
                username: null,
                email: null,
                name: null,
                bio: null,
                location: null,
                birthDate: null,
                picture: null,
                dateCreated: null
            }
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;