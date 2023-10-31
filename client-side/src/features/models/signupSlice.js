import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signuped : false,
}

const signupSlice = createSlice({

    name : 'loggedIn',
    initialState,
    reducers : {
        signupAction : (state ) => {
            state.signuped = true;
        },
        signupOffAction : (state) => {
            state.signuped = false;
        }
    }
})

export const { signupAction, signupOffAction } = signupSlice.actions;

export default signupSlice.reducer;