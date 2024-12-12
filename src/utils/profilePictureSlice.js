import { createSlice } from "@reduxjs/toolkit";

const profilePictureSlice = createSlice({
    name: 'profilePicture',
    initialState: null,
    reducers:{
        addProfilePicture: (state,action) => {
            return action.payload
        },
        removeProfilePicture: (state,action) => {
            return null
        }
    }
})
export const {addProfilePicture, removeProfilePicture} = profilePictureSlice.actions;
export default profilePictureSlice.reducer;