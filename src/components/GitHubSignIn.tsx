import { signIn } from "@/auth"

const GitHubSignIn = () => {
    return (
        <>
            <form action={async () => {
                'use server'
                await signIn('github')
            }}>
                <button>
                    Continue with GitHub
                </button>
            </form >
        </>
    )
}

export { GitHubSignIn }