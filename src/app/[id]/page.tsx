import RichTextViewer from "@/components/RichTextViewer"

type HomeIdProps = {
    params: { id: string }
}

const HomeId = async ({ params }: HomeIdProps) => {
    const { id } = params

    return (
        <>
            <h1>ID: {id}</h1>
            <RichTextViewer id={id} />
        </>
    )
}

export default HomeId