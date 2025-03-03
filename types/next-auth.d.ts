import { Role } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role: Role;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: Role;
        };
    }
}
