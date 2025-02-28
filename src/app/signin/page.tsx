import { auth } from "@/auth"
import { GitHubSignIn } from "@/components/GitHubSignIn"
import { redirect } from "next/navigation"

const SignIn = async () => {
    const session = await auth()
    if (session) redirect('/admin')

    return (
        <>
            <h1>Sign-In</h1>
            <GitHubSignIn />
        </>
    )
}

export default SignIn