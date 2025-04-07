import { signIn } from "@/auth"
import Button from "./Button"

const SignInButton = ({
    provider, label }: {
        provider: string,
        label: string
}) => {
    return (
            <>
                <form action={async () => {
                    'use server'
                    await signIn(provider)
                }}>
                    <Button label={label} />
                </form >
            </>
        )
}

export default SignInButton