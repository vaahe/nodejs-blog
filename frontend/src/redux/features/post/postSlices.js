import { createSlice } from "@reduxjs/toolkit";

export const postSlices = createSlice({
    name: 'posts',
    initialState: {
        allPosts: [],
        myPosts: []
    },
    reducers: {
        allPosts: (state, action) => {
            state.allPosts.push(action.payload);
        },
        myPosts: (state, action) => {
            state.myPosts.push(action.payload);
        }
    }
});

export const { allPosts, myPosts } = postSlices.actions;

export const selectAllPosts = (state) => state.posts.allPosts;
export const selectMyPosts = (state) => state.posts.myPosts;

export default postSlices.reducer;