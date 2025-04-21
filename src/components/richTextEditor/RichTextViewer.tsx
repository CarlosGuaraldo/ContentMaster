import { getPage } from "@/app/actions/getPage";

type RichTextViewerProps = {
  route: string;
};

const RichTextViewer: React.FC<RichTextViewerProps> = async ({ route }) => {
  const result = await getPage(route);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: result.content }} />
    </>
  );
};

export default RichTextViewer;
