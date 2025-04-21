import { auth } from "@/auth";
import Link from "next/link";
import styles from '@/components/home/Home.module.css';
import { getPages } from "@/app/actions/getPages";


const Home = async () => {
    const session = await auth()
    const userId = session?.user.id
    let pages = null

    if (session && userId) {
        pages = await getPages(userId)
    }

    return (
        <main className={styles.main}>
            {session ? (
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <Link href="/admin/home" className={styles.link}>Go to edit content</Link>
                    </li>
                    {pages?.data?.map((page) => (
                        <li key={page.id}>
                            <Link href={`/page/${page.route}`}>{page.title}</Link>
                        </li>
                    ))}
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
