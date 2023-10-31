import { useState, useMemo } from "react";
import styles from './styles.module.css';
import { useRouter } from "next/router";
import DashboardComponent from "@/Components/DashboardComponent";

export default function Dashboard () {

    const router = useRouter();
    const [librarianId, setLibrarianId] = useState();

    const changeUrl = useMemo(() => {
        setLibrarianId(router.query.librarianId);
    },[router.query.librarianId])

    return (
        <div className = {styles.wholeCont}>
            <DashboardComponent librarianId={librarianId} />
        </div>
    )
}