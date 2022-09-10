import { createSlice } from "@reduxjs/toolkit";

const firstname = localStorage.getItem("firstname");
const lastname = localStorage.getItem("lastname");

const sellPhoneSlice = createSlice({
    name: 'sellphone',
    initialState:{
        firstname:firstname,
        lastname:lastname,
    },
    reducers:{
        updateName: (state, action) => {
            const {firstname, lastname} = action.payload;
            state.firstname = firstname;
            state.lastname = lastname;
            console.log("daole");
        }
    }
})

export const {updateName} = sellPhoneSlice.actions;

export default sellPhoneSlice.reducer;

// let getFullName = async function(state){
//     let response = await http.get("/users/profile?_id=" + user_id);
//     return response;
//     state.firstname = 
// }