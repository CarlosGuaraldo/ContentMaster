import { auth } from "@/auth"
import SignIn from "@/components/SignIn"
import { redirect } from "next/navigation"

const Login = async () => {
    const session = await auth()
    if (session) redirect('/')

    return <SignIn />
}

export default Login