import { auth } from "@/auth"
import { GitHubSignIn } from "@/components/GitHubSignIn"
import { redirect } from "next/navigation"
import { KeycloakSignIn } from "./KeycloakSignIn"

const SignIn = async () => {
    const session = await auth()
    if (session) redirect('/')

    return (
        <>
            <h1>Sign-In</h1>
            <GitHubSignIn />
            <KeycloakSignIn />
        </>
    )
}

export default SignIn