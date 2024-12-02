import { createSlice } from "@reduxjs/toolkit";
// import { DEFAULT_ITEMS } from "../data/items";

const itemsSlice = createSlice({
    name:'items',
    // initialState: DEFAULT_ITEMS,
    initialState:[],
    reducers:{
        addInitialItem: (state, action)=>{
            return action.payload;
        }
    }
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice;
