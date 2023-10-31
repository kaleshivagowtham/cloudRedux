import { useEffect, useMemo, useState } from "react";
import styles from './styles.module.css';
import AddBooks from "../AddBooks";
import UpdateBooks from "../UpdateBooks";

export default function DashboardComponent ({librarianId}) {


    const baseURL = "http://localhost:5000/getlibrarian";
    const booksURL = "http://localhost:5000/getlibbooks";
    const deleteURL = "http://localhost:5000/deletebook";

    const [librarian, setLibrarian] = useState({"name" :"shivakale","role":"Librarian", "booksAdded":["6540038152f9ba2fb3a41222"]});
    const [books, setBooks] = useState([{_id:"",title : "", author: "", genres : [""],excerpt:""}]);

    const [addBooksOpen, setAddBooksOpen] = useState(false);
    const [updateBooksOpen, setUpdateBooksOpen] = useState(false);

    const [id, setId] = useState('');

    useEffect(() => {
        const response = fetch( baseURL , {
            method : 'POST',
            body : JSON.stringify({
                librarianId : librarianId
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then( json => {
            // data to ge fetched
            // console.log("Data: ",json);
            if(json){
                const response = fetch(booksURL , {
                    method : 'POST',
                    body : JSON.stringify({
                        booksAdded : json.booksAdded
                    }),
                    headers :{
                        "Content-Type" : "application/json"
                    }
                })
                .then(res => res.json())
                .then( resp => {
                    console.log("dcjdfsbv: ",resp);
                    setBooks(resp);
                })
                .catch(err => console.log("err2: ",err.message));
            }
        })
        .catch(err => console.log("err1: ",err.message));
    },[]);

    // console.log("librarian: ",librarian);

    const deleteBookHandler = (e,bookId) => {
        const response = fetch(deleteURL , {
            method : 'DELETE',
            body : JSON.stringify({
                bookId : bookId
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then( json => {
            console.log("called:",json);

        })
        .catch(err => console.log(err));
    }

    const editHandler = (theId) => {
        setId(theId);
        setUpdateBooksOpen(true);
    }
    return (
        <div className = {styles.wholeCont} onClick={e => {setAddBooksOpen(false), setUpdateBooksOpen(false)}}>
            {addBooksOpen  && <AddBooks />}
            {updateBooksOpen  && <UpdateBooks id={id} />}
            <h1 className={styles.name}>Name: {librarian.name}</h1>
            <p className={styles.role}>Role: {librarian.role}</p>
            <div className={styles.loginButton} onClick={e => {e.stopPropagation(),setAddBooksOpen(true)}} >
                <p className={styles.loginText}>Add Books +</p>
            </div>
            <div className= {styles.booksCont}>
                {books && books?.map((eachBook) => {
                    return  (
                        <div href={`/book/${eachBook._id}`} key={eachBook} className={styles.eachBookCont} >
                            <h1 className={styles.bookTitle1}>{eachBook.title}</h1>
                            <div className={styles.completeInfoCont}>
                                <h1 className={styles.bookTitle}>{eachBook.title}</h1>
                                <p className={styles.bookTitle}>{eachBook.author}</p>
                                <div className={styles.genreCont}>
                                    <p className={styles.genre}>genre :</p>
                                    <div className={styles.eachGenreCont}>
                                        {
                                            eachBook.genres?.map((eachGenre) => {
                                                return <p key={eachGenre} className={styles.eachGenre}>{eachGenre},</p>
                                            })
                                        }
                                    </div>
                                </div>
                                <p className={styles.info}>{eachBook.excerpt}</p>
                            </div>
                            <div className={styles.operationsCont}>
                                <img src='/editIcon.png' className={styles.eachIcon} onClick={e => {e.stopPropagation(),editHandler(eachBook._id)}}/>
                                <img src='/deleteIcon.png' className={styles.eachIcon} onClick={e => {e.stopPropagation(),deleteBookHandler(e,eachBook._id)}}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}