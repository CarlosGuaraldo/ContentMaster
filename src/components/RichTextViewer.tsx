import { getRichTextContent } from "@/app/actions/getRichTextContent"

const RichTextViewer = async () => {

    const content = await getRichTextContent();

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </>
    )
}

export default RichTextViewer