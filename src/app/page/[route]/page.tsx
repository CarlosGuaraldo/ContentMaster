import { redirect } from "next/navigation"
import RichTextViewer from "@/components/richTextEditor/RichTextViewer"

const CustomPage = async ({ params }: { params: { route: string } }) => {
    const route = params.route;

    if (!route) {
        return redirect("/");
    }

    return <RichTextViewer route={route} />;
}

export default CustomPage;
