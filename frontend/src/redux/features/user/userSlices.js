import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {}
    },
    reducers: {
        loggedIn: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { loggedIn } = userSlice.actions;

export const selectUser = (state) => state.users.user;

export default userSlice.reducer;