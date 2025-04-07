import { signIn } from "@/auth"
import Button from "@/components/buttons/Button"

const GitHubSignIn = () => {
    return (
        <>
            <form action={async () => {
                'use server'
                await signIn('github')
            }}>
                <Button label="Sign-in with Github" type="submit" />
            </form >
        </>
    )
}

export { GitHubSignIn }