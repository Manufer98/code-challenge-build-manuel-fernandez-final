import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from "./slices/contactsSlice";


export const store=configureStore({
    reducer:{
     contacts:contactsSlice   
    }
})