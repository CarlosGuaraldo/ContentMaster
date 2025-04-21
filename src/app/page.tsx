import { auth } from "@/auth";
import Link from "next/link";
import styles from "@/components/home/Home.module.css";
import { getPages } from "@/app/actions/getPages";

const Home = async () => {
    const session = await auth();
    const userId = session?.user.id;
    let pages = null;

    if (session && userId) {
        pages = await getPages(userId);
    }

    return (
        <main className={styles.main}>
            {session ? (
                <>
                    <section className={styles.header}>
                        <Link href="/admin/home" className={styles.button}>+ Create a New Page</Link>
                    </section>
                    <section className={styles.pages}>
                        <h2 className={styles.title}>Your Pages</h2>
                        <ul className={styles.list}>
                            {pages?.data?.map((page) => (
                                <li key={page.id} className={styles.listItem}>
                                    <Link href={`/page/${page.route}`} className={styles.link}>
                                        {page.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </>
            ) : (
                <section className={styles.authMessage}>
                    <p className={styles.message}>
                        Please log in to start creating beautiful interfaces.
                    </p>
                </section>
            )}
        </main>
    );
};

export default Home;
