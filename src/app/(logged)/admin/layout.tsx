import { auth } from "@/auth"
import { redirect } from "next/navigation"

const AdminLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
    if (!session) redirect('/login')

    return (
        <>
            <p>{JSON.stringify(session.user)}</p>
            {children}
        </>
    )
}

export default AdminLayout
