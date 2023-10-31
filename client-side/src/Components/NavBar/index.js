import { useState } from "react";
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { openLoginModal, closeLoginModal } from "@/features/models/loginModalSlice";
import Link from "next/link";

export default function NavBar() {

    const dispatch = useDispatch();

    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {isLoggedIn, isLibrarian, userName} = useSelector(store => store.loggedIn);

    const loginModalHandler = () => {
        dispatch(openLoginModal());
    }

    console.log(isLibrarian);

    return (
        <div className={styles.wholeCont}>
            <div className={styles.logoCont}>
                <img className={styles.logoImg} src='/logoImg.png'/>
            </div>
            <div className={styles.menuCont}>
                { isLoggedIn 
                ?
                    <img className={styles.loginPic} src='loginIcon.png'/>
                :
                    <div className={styles.loginButton} onClick={loginModalHandler}>
                        <p className={styles.loginText}>login/signup</p>
                    </div>
                }
                { isLibrarian 
                ?
                    <Link href={`/librarian/${userName}`} className={styles.loginButton}>
                        <p className={styles.loginText}>Dashboard</p>
                    </Link>
                :
                    null
                }
            </div>
        </div>
    )
}