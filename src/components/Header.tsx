import { auth } from "@/auth"
import Link from "next/link"
import SignOut from "./SignOut"

const Header = async () => {
    const session = await auth()

    return (
        <header>
            <h1>
                <Link href="/">Content Master</Link>
            </h1>
            <nav>
                {!session ? (
                    <Link href="/login">Login</Link>
                ) : (
                    <div>
                        <span>Welcome, {session.user.name}!</span>
                        <SignOut />
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header