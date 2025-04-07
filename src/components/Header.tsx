import { auth } from "@/auth"
import Link from "next/link"
import SignOut from "./SignOut"
import styles from "@/components/Header.module.css"

const Header = async () => {
    const session = await auth()

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link href="/" className={styles.link}>Content Master</Link>
            </h1>
            <nav className={styles.nav}>
                {!session ? (
                    <Link href="/login" className={styles.navLink}>Login</Link>
                ) : (
                    <div className={styles.userSection}>
                        <span className={styles.welcomeText}>Welcome, {session.user.name}!</span>
                        <SignOut />
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header