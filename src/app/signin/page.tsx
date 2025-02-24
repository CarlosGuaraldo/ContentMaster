import { auth } from "@/auth"
import { GitHubSignIn } from "@/components/GitHubSignIn"
import { redirect } from "next/navigation"

const SignIn = async () => {
    const session = await auth()
    if (session) redirect('/')

    return (
        <>
            Sign-In component
            <GitHubSignIn />
        </>
    )
}

export default SignIn