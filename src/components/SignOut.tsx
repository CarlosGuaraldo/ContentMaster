'use client';

import { signOut } from "@/auth";

const SignOut = () => {
    // make the sign out work
    // should I move it to a server action?
    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <button onClick={handleSignOut}>
                Sign Out
            </button>
        </>
    );
}

export default SignOut;
