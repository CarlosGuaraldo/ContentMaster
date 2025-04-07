import { signIn } from "@/auth"
import Button from "./Button"

const KeycloakSignIn = () => {
    return (
        <>
            <form action={async () => {
                'use server'
                await signIn('keycloak')
            }}>
                <Button label="Sign-in with Keycloak" />
            </form >
        </>
    )
}

export { KeycloakSignIn }