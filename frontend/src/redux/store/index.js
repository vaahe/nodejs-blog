import { configureStore } from '@reduxjs/toolkit';

import postReducer from '../features/post/postSlices';
import userReducer from '../features/user/userSlices';

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: userReducer
    },
});