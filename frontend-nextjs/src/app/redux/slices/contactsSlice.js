import { createSlice,PayloadAction } from "@reduxjs/toolkit";



const contactsSlice=createSlice({
    name:'contacts',
    initialState:{
		contacts:[],
		
	},
    reducers:{
        InitalContacts:(state, action)=>{
			state.contacts = [...action.payload]},

    }
})

export const { InitalContacts } = contactsSlice.actions;

export default contactsSlice.reducer;