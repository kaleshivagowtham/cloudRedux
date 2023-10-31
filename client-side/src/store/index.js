import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from '../features/models/loginModalSlice';
import loginReducer from '../features/models/loginSlice';
import signupModalReducer from '../features/models/signupModalSlice';
import signupSlice from "@/features/models/signupSlice";

export const store = configureStore({

    reducer : {

        loginModal : loginModalReducer,
        loggedIn : loginReducer,
        signupModal : signupModalReducer,
        signup : signupSlice
    },
})