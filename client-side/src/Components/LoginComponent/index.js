import styles from './styles.module.css';
import { openLoginModal , closeLoginModal } from '../../features/models/loginModalSlice';
import {openSignupModal} from '../../features/models/signupModalSlice';
import { useSelector ,useDispatch } from 'react-redux';
// import { rememberTheUser } from '../../features/modal/rememberLoginSlice';
import { useState, useRef } from 'react';
import {loginAction, librarianAction} from '../../features/models/loginSlice';

export default function LoginComponent() {

    const inputRef = useRef();

    const loginUrl = 'http://localhost:5000/signin';

    const dispatch = useDispatch();

    const {isLoggedIn, isLibrarian} = useSelector(store => store.loggedIn);
    const [loggedIn , setLoggedIn] = useState(isLoggedIn);

    const [loginCreds , setLoginCreds] = useState({email : '',password : ''});
    const [selected, setSelected] = useState('email');
    const [hidePassword , setHidePassword] = useState(true);

    const inputHandler = (e) => {

        const temp = {...loginCreds};
        if(e.target.name === 'email'){
            temp.email = e.target.value;
        }
        if(e.target.name === 'password'){
            temp.password = e.target.value;
        }
        setLoginCreds(temp);
    }

    const submitHandler = async () => {
        const response = await fetch(loginUrl , {
            method : 'POST',
            body : JSON.stringify({
                loginCreds : loginCreds
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then( json => {
            console.log(json);
            if(json.loginStatus === 'Login successful')
            {
                dispatch(loginAction({username : json.username}));
                dispatch(closeLoginModal());
                if(json.role === "librarian")
                    dispatch(librarianAction());
            }
            else if(json.loginStatus === 'username or password incorrect')
            {
                console.log("login failed");
            }
        })
        .catch(err => console.log(err))
    }

    const registerHandler = () => {
        dispatch(closeLoginModal());
        dispatch(openSignupModal());
    }
    
    return(
        <div className={styles.wholeCont} onClick={e => dispatch(closeLoginModal())}>
            <div className={styles.modalCont} onClick={e => e.stopPropagation()}>
                <label className={`${styles.inputCont} ${selected === 'email'? styles.inputContClicked : ''}`} onClick={e => setSelected('email')}>
                    <p className={`${styles.inputTitle} ${selected === 'email'|| loginCreds.email != ''  ? styles.inputTitleClicked : ''}`}>Email</p>
                    <input className={`${styles.inputBox} ${selected === 'email' ? styles.inputBoxClicked : ''}`}
                    name='email'
                    ref={inputRef}
                    onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                    />
                </label>
                <label className={`${styles.inputCont} ${selected === 'password'? styles.inputContClicked : ''}`} onClick={e => setSelected('password')}>
                    <p className={`${styles.inputTitle} ${selected === 'password'|| loginCreds.password != ''  ? styles.inputTitleClicked : ''}`}>Password</p>
                    <input className={`${styles.inputBox} ${selected === 'password' ? styles.inputBoxClicked : ''}`}
                    name='password'
                    onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                    type={hidePassword ? "password" :"text"}
                    />
                    <img src='/passwordShow.png' className={styles.passwordShowBtn} alt='Password hide button' 
                        onClick = {e => {setHidePassword(!hidePassword)}}
                    />
                </label>
                <button className={styles.submitBtn} onClick={e => submitHandler()}>SIGN IN</button>
                <p className={styles.rememberMeText}>Not a member?</p>
                <p className={styles.forgotPassText} onClick={e => registerHandler()}>Register</p>
            </div>
        </div>
    )
}