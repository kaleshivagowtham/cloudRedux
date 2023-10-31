import { useMemo, useState } from "react";
import styles from './styles.module.css';
import NavBar from "../NavBar";
import {useSelector, useDispatch} from 'react-redux';
import LoginComponent from "../LoginComponent";
import SignupComponent from "../SignupComponent/index";
import Notification from "../Notification";
import {signupOffAction} from '../../features/models/signupSlice';

export default function Layout({children}) {

    const dispatch = useDispatch();

    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {isSignupModalOpen} = useSelector(store => store.signupModal);
    const {signuped} = useSelector(store => store.signup)

    const alter = useMemo(() => {
        setTimeout(() => {
            dispatch(signupOffAction());
        },5000)
    },[signuped])

    return (
        <div className={styles.wholeCont}>
            <NavBar />
            {isLoginModalOpen && <LoginComponent />}
            {isSignupModalOpen && <SignupComponent />}
            {signuped && <Notification message="Signed up successfully"/>}
            <main>{children}</main>
        </div>
    )
}