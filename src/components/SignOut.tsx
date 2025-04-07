import { signOut } from "@/auth";
import Button from "./Button";
import styles from '@/components/Button.module.css'

const SignOut = () => {
    return (
        <>
            <form action={async () => {
                'use server'
                await signOut()
            }}>
                <Button label="Sign Out" class={styles.buttonSignOut} />
            </form>
        </>
    );
}

export default SignOut;
