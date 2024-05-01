import { createSlice } from "@reduxjs/toolkit";



const contactsSlice=createSlice({
    name:'contacts',
    initialState:{
		contacts:[],
		
	},
    reducers:{
        GetContacts:(state, action)=>{
			state.contacts = [...action.payload]},

    }
})

export const { GetContacts } = contactsSlice.actions;

export default contactsSlice.reducer;