import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    isLibrarian : false,
    userName : '',
}

const loginSlice = createSlice({

    name : 'loggedIn',
    initialState,
    reducers : {
        loginAction : (state , action) => {
            state.isLoggedIn = true;
            state.userName = action.payload.username;
        },
        librarianAction : (state) => {
            state.isLibrarian = true;
        },
        logoutAction : (state) => {
            state.isLibrarian = false;
            state.userName = '';
        }
    }
})

export const { loginAction ,logoutAction, librarianAction } = loginSlice.actions;

export default loginSlice.reducer;