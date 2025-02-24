import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
    debug: true,
    providers: [GitHub],
    events: {
        signOut(message) {
            console.log('User signed out: ', message);
        },
    },
});
