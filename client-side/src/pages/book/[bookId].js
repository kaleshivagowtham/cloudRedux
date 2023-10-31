import { useState, useMemo } from "react";
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import BookViewerComponent from "@/Components/BookViewerComponent";

export default function BookViewer() {

    const router = useRouter();
    const [id, setId] = useState();

    const changeUrl = useMemo(() => {
        setId(router.query.bookId);
    },[router.query.bookId])

    return (
        <div className = {styles.wholeCont}>
            <BookViewerComponent id={id}/>
        </div>
    )
}