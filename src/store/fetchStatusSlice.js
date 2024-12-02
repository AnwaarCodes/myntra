import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
    name:'fetchstatus',
    initialState: { 
        fetchDone:false,
       currentlyFetching:false,
       fetchError: false,
    },
    reducers:{
        markFetchDone:(state)=>{
         state.fetchDone = true;  
        },
        markFetchingStarted:(state)=>{
         state.currentlyFetching = true;  
        },
        markFetchingFinished:(state)=>{
         state.currentlyFetching = false;  
        },
        markFetchingError: (state) => {
            state.fetchError = true;
            state.isFetching = false;
          },          
     }
});

export const fetchStatusActions = fetchStatusSlice.actions;

export default fetchStatusSlice;