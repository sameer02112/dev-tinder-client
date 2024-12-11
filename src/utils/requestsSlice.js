import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'request',
    initialState: null,
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => null,
        removeRequestById: (state, action) => {
           if (state) {
            return state.filter(user => user._id !== action.payload);
        }
        }
    }
})


export const {addRequest, removeRequest, removeRequestById} = requestSlice.actions;
export default requestSlice.reducer;