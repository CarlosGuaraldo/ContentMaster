import { signIn } from "@/auth"

const KeycloakSignIn = () => {
    return (
        <>
            <form action={async () => {
                'use server'
                await signIn('keycloak')
            }}>
                <button>
                    Continue with Keycloak
                </button>
            </form >
        </>
    )
}

export { KeycloakSignIn }