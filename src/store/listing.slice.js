import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobListings: [],
};

export const slice = createSlice({
    name:'Listings',
    initialState,
    reducers:{
        setJobListings:(state ,action) =>{
            state.jobListings = [...new Set([...state.jobListings,...action.payload])];
        }
    }
});

export const {setJobListings} = slice.actions;

export default slice.reducer;