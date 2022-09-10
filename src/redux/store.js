import { configureStore } from "@reduxjs/toolkit";
import sellPhoneSlice from "./features/sellPhoneSlice";
export default configureStore({
    reducer:{
        sellphone: sellPhoneSlice,
    }
})