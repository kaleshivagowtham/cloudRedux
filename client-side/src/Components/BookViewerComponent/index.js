import { useEffect, useState } from "react";
import styles from './styles.module.css';


export default function BookViewerComponent({id}) {

    const baseURL = 'http://localhost:5000/getthebook';

    const [book, setBook] = useState({_id:"",title : "abc", author: "dvjbflvbdflv fvsdfv", genres : ["comedy", "action", "war"],excerpt:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."});

    useEffect(() => {
        fetch(baseURL , {
            method : 'POST',
            body : JSON.stringify({
                bookId : id
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then( json => {
            setBook(json[0]);
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div className = {styles.wholeCont}>
            <div className = {styles.leftCont}></div>
            <div className={styles.rightCont}>
                <h1 className={styles.bookTitle}>Title: {book.title}</h1>
                <p className={styles.bookTitle}>Author: {book.author}</p>
                <div className={styles.genreCont}>
                    <p className={styles.genre}>genre: </p>
                    <div className={styles.eachGenreCont}>
                        {
                            book.genres?.map((eachGenre) => {
                                return <p key={eachGenre} className={styles.eachGenre}>{eachGenre},</p>
                            })
                        }
                    </div>
                </div>
                <p className={styles.info}>{book.excerpt}</p>
            </div>
        </div>
    )
}