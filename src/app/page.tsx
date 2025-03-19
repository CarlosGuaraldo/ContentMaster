import { auth } from "@/auth";

const Home = async () => {
    const session = await auth()

    return (
        <main>
            <h1>Home Page</h1>
            <section>
                <div>
                    <p>Signed in as:</p>
                    <p>id: {JSON.stringify(session)}</p>
                    <p>email: {session?.user?.email}</p>
                    <p>name: {session?.user?.name}</p>
                    <p>image: {session?.user?.image}</p>
                    <p>expires: {session?.expires}</p>
                </div>
            </section>
        </main>
    );
}

export default Home
