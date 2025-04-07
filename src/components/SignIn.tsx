import { auth } from "@/auth"
import { GitHubSignIn } from "@/components/GitHubSignIn"
import { redirect } from "next/navigation"
import { KeycloakSignIn } from "./KeycloakSignIn"
import styles from '@/components/SignIn.module.css'

const SignIn = async () => {
    const session = await auth()
    if (session) redirect('/')

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Choose the way that you want to sign-in</h1>
            <div className={styles.signInOptions}>
                <GitHubSignIn />
                <KeycloakSignIn />
            </div>
        </main>

    )
}

export default SignIn