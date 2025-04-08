import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { redirect } from "next/navigation"

const AdminLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
    if (!session) redirect('/login')

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AdminLayout
