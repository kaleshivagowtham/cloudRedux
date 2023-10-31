import { useRef, useState } from "react";
import styles from './styles.module.css';

export default function AddBooks() {

    const inputRef = useRef();

        const [books, setBooks] = useState({title : '', author: '', genres : [""],excerpt:'',stock:'Available'});
        const [selected, setSelected] = useState('title');

        const inputHandler = (e) => {

        const temp = {...books};
        if(e.target.name === 'title'){
            temp.title = e.target.value;
        }
        if(e.target.name === 'author'){
            temp.author = e.target.value;
        }
        if(e.target.name === 'excerpt'){
            temp.excerpt = e.target.value;
        }
        setBooks(temp);
    }

    const submitHandler = () => {
        fetch("http://localhost:5000/addbook" , {
            method : 'POST',
            body : JSON.stringify({
                books : books
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then( json => {
            console.log(json);
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={styles.wholeCont} onClick={e => e.stopPropagation()}>
            <label className={`${styles.inputCont} ${selected === 'title'? styles.inputContClicked : ''}`} onClick={e => setSelected('title')}>
                <p className={`${styles.inputTitle} ${selected === 'title'|| books.title != ''  ? styles.inputTitleClicked : ''}`}>Title</p>
                <input className={`${styles.inputBox} ${selected === 'title' ? styles.inputBoxClicked : ''}`}
                name='title'
                ref={inputRef}
                onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                />
            </label>
            <label className={`${styles.inputCont} ${selected === 'author'? styles.inputContClicked : ''}`} onClick={e => setSelected('author')}>
                <p className={`${styles.inputTitle} ${selected === 'author'|| books.author != ''  ? styles.inputTitleClicked : ''}`}>Author</p>
                <input className={`${styles.inputBox} ${selected === 'author' ? styles.inputBoxClicked : ''}`}
                name='author'
                ref={inputRef}
                onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                />
            </label>
            {/* <label className={`${styles.inputCont} ${selected === 'email'? styles.inputContClicked : ''}`} onClick={e => setSelected('email')}>
                <p className={`${styles.inputTitle} ${selected === 'email'|| books.gener != ''  ? styles.inputTitleClicked : ''}`}>Email</p>
                <input className={`${styles.inputBox} ${selected === 'email' ? styles.inputBoxClicked : ''}`}
                name='email'
                ref={inputRef}
                onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                />
            </label> */}
            <label className={`${styles.inputCont} ${selected === 'excerpt'? styles.inputContClicked : ''}`} onClick={e => setSelected('excerpt')}>
                <p className={`${styles.inputTitle} ${selected === 'excerpt'|| books.excerpt != ''  ? styles.inputTitleClicked : ''}`}>Excerpt</p>
                <textarea className={`${styles.inputBox} ${selected === 'excerpt' ? styles.inputBoxClicked : ''}`}
                name='excerpt'
                ref={inputRef}
                onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                />
            </label>
            <div className={styles.loginButton} onClick={submitHandler} >
                <p className={styles.loginText}>Add Books +</p>
            </div>
        </div>
    )
}