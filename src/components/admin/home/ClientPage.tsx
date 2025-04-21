"use client";

import { useUserSession } from "@/hooks/useUserSession";
import dynamic from "next/dynamic";

const PageForm = dynamic(() => import('@/components/admin/home/PageForm'), { ssr: false });

const AdminHomeClientPage = () => {
    const { isLoading, userId } = useUserSession();

    if (isLoading) return <>Loading...</>;
    if (!userId) return <>Unauthorized</>;

    return <PageForm userId={userId} />;
};

export default AdminHomeClientPage;
