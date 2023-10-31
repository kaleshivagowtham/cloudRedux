import {useEffect, useState} from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

export default function BookListComponent () {

    const baseURL = 'http://localhost:5000/getbooks';

    const [books, setBooks] = useState([{_id:"",title : "", author: "", genres : [""],excerpt:""}]);

    useEffect(() => {
        const response = fetch(baseURL,{
            method : 'GET',
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then (res => res.json())
        .then ( items => {
            console.log(items);
            setBooks(items.books);
        })
        .catch(err => console.log("Error: ",err));
    },[])

    return (
        <div className = {styles.wholeCont}>
            <div className= {styles.booksCont}>
                {books && books?.map((eachBook) => {
                    return  (
                        <Link href={`/book/${eachBook._id}`} key={eachBook} className={styles.eachBookCont} >
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
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}