import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma";
import CONFIG from "./config/config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    debug: true,
    providers: [GitHub],
    session: {
        maxAge: CONFIG.SESSION.MAX_AGE
    }
});
