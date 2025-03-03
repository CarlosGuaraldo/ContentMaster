import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import CONFIG from "./config/config";
import { Role } from "@prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma), // Fix type error here
    debug: true,
    providers: [GitHub({
        profile(profile) {
            return {
                id: String(profile.id),
                email: profile.email,
                image: profile.avatar_url,
                name: profile.name,
                role: Role.EDITOR,
            }
        }
    })],
    session: {
        maxAge: CONFIG.SESSION.MAX_AGE,
    },
    callbacks: {
        async session({ session, user }) {
            session.user.role = user.role
            return session;
        },
    },
});
