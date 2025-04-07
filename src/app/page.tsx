import { auth } from "@/auth";
import Link from "next/link";
import styles from '@/components/home/Home.module.css';


const Home = async () => {
    const session = await auth()

    return (
        <main className={styles.main}>
            {session ? (
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <Link href="/admin/home" className={styles.link}>Go to edit content</Link>
                    </li>
                </ul>
            ) : (
                <div className={styles.message}>
                    Please log in to start creating beautiful interfaces.
                </div>
            )}
        </main>
    );
}

export default Home
