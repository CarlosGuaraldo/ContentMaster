import { getPage } from "@/app/actions/getPage";

type RichTextViewerProps = {
  id: string;
};

const RichTextViewer: React.FC<RichTextViewerProps> = async ({ id }) => {
  const result = await getPage(id);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: result.content }} />
    </>
  );
};

export default RichTextViewer;
