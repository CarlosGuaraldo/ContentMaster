import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/signin')

    return (
        <main>
            <h1>Home Page</h1>
            <section>
                <div>
                    <p>Signed in as:</p>
                    <p>id: {session.user?.id}</p>
                    <p>email: {session.user?.email}</p>
                    <p>name: {session.user?.name}</p>
                    <p>image: {session.user?.image}</p>
                    <p>expires: {session.expires}</p>
                </div>
                <SignOut />
            </section>
        </main>
    );
}

export default Home
