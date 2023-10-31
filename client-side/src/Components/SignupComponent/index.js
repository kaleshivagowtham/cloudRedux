import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import {closeSignupModal} from '../../features/models/signupModalSlice';
import {openLoginModal} from '../../features/models/loginModalSlice';
import {signupAction} from '../../features/models/signupSlice';

export default function SignupComponent() {

    const dispatch = useDispatch();

    const signupUrl = 'http://localhost:5000/signup';

    const [currRef , setCurrRef] = useState('');
    const [regDetails , setRegDetails] = useState({'username' : '',
                                                    'email' : '',
                                                    'password' : '',
                                                    'name' : '',
                                                    'role' : ''});
    const [validateDetails , setValidateDetails] = useState({'username' : 'valid',
                                                            'email' : 'valid',
                                                            'password' : 'valid',
                                                            'name' : 'valid',
                                                            'role' : 'valid'});

    const changeHandler = (e) => {
        const temp = regDetails;
        temp[e.target.name] = e.target.value
        setRegDetails(temp);
    }

    const validateUsername = (e) => {
        console.log("username null:",regDetails.username);
        const temp = validateDetails;
        temp.username = 'empty';
        setValidateDetails(temp);
    }

    const validatePassword = (e) => {
        console.log("password : ",regDetails.password);
        const temp = validateDetails;
        temp.password = 'empty';
        setValidateDetails(temp);
    }

    const validateEmail = (e) => {
        console.log("email : ",regDetails.email);
        const temp = validateDetails;
        temp.email = 'empty';
        setValidateDetails(temp);
    }

    const validateName = (e) => {
        console.log("name : ",regDetails.name);
        const temp = validateDetails;
        temp.name = 'empty';
        setValidateDetails(temp);
    }

    const validateRole = (e) => {
        console.log("name : ",regDetails.role);
        const temp = validateDetails;
        temp.role = 'empty';
        setValidateDetails(temp);
    }

    const signupHandler = async (e) => {
        console.log(regDetails);
        if( regDetails.username ===  null || regDetails.username === '' || regDetails.email === null || regDetails.email === '' || regDetails.password === null || regDetails.password === '' || regDetails.name === null || regDetails.name === '')
        {
            if(regDetails.username ===  null || regDetails.username === '')
                validateUsername(e);
            if(regDetails.email === null || regDetails.email === '')
                validateEmail(e);
            if (regDetails.password === null || regDetails.password === '' )
                validatePassword(e);
            if(regDetails.name === null || regDetails.name === '')
                validateName(e);
            if(regDetails.role === null || regDetails.role === '')
                validateRole(e);
        }
        else
        {
            const temp = validateDetails;
            temp.username = 'valid';
            temp.password = 'valid';
            temp.email = 'valid';
            temp.name = 'valid';
            temp.role = 'valid'
            setValidateDetails(temp);
            
            const response = await fetch( signupUrl , {
                method : 'POST',
                body : JSON.stringify({
                    regDetails : regDetails
                }),
                headers : {
                    "Content-Type" : "application/json",
                }
            })
            .then(res => res.json())
            .then(JSON => {
                console.log(JSON);
                if(JSON.status === 'User saved successfully')
                {
                    dispatch(openLoginModal());
                    dispatch(signupAction());
                    dispatch(closeSignupModal());
                }
                if(JSON === 'The user already exists')
                {
                    console.log('The user already exists');
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className={styles.wholeCont} onClick={e => dispatch(closeSignupModal())}>
            <div className={styles.cont} onClick={e => {e.stopPropagation() , setCurrRef('')}}>
                <h3 className={styles.registerText}>Registration</h3>
                <div className={styles.midCont}>
                    <div className={styles.midLCont}>
                        <label className={`${styles.inputCont} ${currRef === 'curRefName' || regDetails.name !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefName')}} >
                            <input className={styles.inputBox} name='name' onChange={e => changeHandler(e)}/>
                            {validateDetails.name === 'empty' ? <p className={styles.redWarningText}>Please enter full name</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefName' || regDetails.name !== '' ? styles.inputTitleClicked : ''}`}>full name</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curRefEmail' || regDetails.email !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefEmail')}} >
                            <input className={styles.inputBox} name='email' onChange={e => changeHandler(e)}/>
                            {validateDetails.email === 'empty' ? <p className={styles.redWarningText}>Please enter email</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefEmail' || regDetails.email !== '' ? styles.inputTitleClicked : ''}`}>email</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curRefUserName' || regDetails.username !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefUserName')}} >
                            <input  className={styles.inputBox} name='username' onChange={e => changeHandler(e)}/>
                            {validateDetails.username === 'empty' ? <p className={styles.redWarningText}>Please enter username</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefUserName' || regDetails.username !== '' ? styles.inputTitleClicked : ''}`}>username</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curRefPassword' || regDetails.password !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefPassword')}} >
                            <input  className={styles.inputBox} name='password' onChange={e => changeHandler(e)}/>
                            {validateDetails.password === 'empty' ? <p className={styles.redWarningText}>Please enter password</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefPassword' || regDetails.password !== '' ? styles.inputTitleClicked : ''}`}>password</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curRefRole' || regDetails.role !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefRole')}} >
                            <input  className={styles.inputBox} name='role' onChange={e => changeHandler(e)}/>
                            {validateDetails.role === 'empty' ? <p className={styles.redWarningText}>Please enter role</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefRole' || regDetails.role !== '' ? styles.inputTitleClicked : ''}`}>role</h4>
                        </label>
                    </div>
                </div>
                <button className={styles.submitButton} onClick={e => signupHandler(e)}>Submit</button>
            </div>
        </div>
    )
}