import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
import requestReducer from './requestsSlice';
import profilePictureReducer from './profilePictureSlice';

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        request: requestReducer,
        profilePicture: profilePictureReducer,
    }
})

export default appStore;