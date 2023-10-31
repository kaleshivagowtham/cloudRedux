import { useState, useEffect, useMemo } from "react";
import styles from './styles.module.css';

export default function HomeComponent() {

    const [name, setName] = useState("");
    const [show, setShow] = useState(true);
    const [i, setI] = useState(-1);
    const nm = 'Welcome to the \nlibrary';

    useEffect(() => {
        setI(0);
    },[])

    const nameAdder = useMemo (() => {
        setTimeout(() => {
            setName(name + nm[i]);
            if(i < 22)
                setI(i+1);
        },100)
    },[i]);

    return (
        <div className={styles.wholeCont}>
            <div className={styles.topCont}>
                <div className={styles.text1Cont}>
                    <h1 className={styles.text1}>{name}</h1>
                </div>
            </div>
        </div>
    )
}