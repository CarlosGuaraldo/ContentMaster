import { useSession } from "next-auth/react";

export const useUserSession = () => {
    const { data: session, status } = useSession();

    if (status === "loading" || status === "unauthenticated") {
        return { isLoading: true, userId: null };
    }

    return { isLoading: false, userId: session?.user.id || null };
};
