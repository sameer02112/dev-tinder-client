import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state,action) => {
            return action.payload;
        },
        removeFeed: (state,action) => {
            return null;
        },
        removeUserFromFeedById: (state, action) => {
            console.log('action.payload',action.payload)
            if (state) {
             return state.filter(user => user._id !== action.payload);
         }
        }
    }
})

export const {addFeed, removeFeed, removeUserFromFeedById} = feedSlice.actions;
export default feedSlice.reducer;
