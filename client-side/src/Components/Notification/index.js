import { useState } from "react";
import styles from './styles.module.css';

export default function Notification ({message}) {

    return (
        <div className = {styles.wholeCont}>
            <p className={styles.msg}>{message}</p>
        </div>
    )
}