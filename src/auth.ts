import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import CONFIG from "./config/config";
import Keycloak from "next-auth/providers/keycloak";

declare module "next-auth" {
  interface User {
    role?: Role;
  }

  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: Role;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: String(profile.id),
          email: profile.email,
          image: profile.avatar_url,
          name: profile.name,
          role: Role.EDITOR,
        };
      },
      clientId: CONFIG.AUTH.AUTH_GITHUB_ID,
      clientSecret: CONFIG.AUTH.AUTH_GITHUB_SECRET,
    }),
    Keycloak
  ],
  session: {
    maxAge: CONFIG.SESSION.MAX_AGE,
  },
  callbacks: {
    async session({ session, user }) {
      if (user.role) {
        session.user.role = user.role;
      }
      return session;
    },
  },
});
