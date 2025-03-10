import { getRichTextContent } from "@/app/actions/getRichTextContent";

type RichTextViewerProps = {
  id: string;
};

const RichTextViewer: React.FC<RichTextViewerProps> = async ({ id }) => {
  const result = await getRichTextContent(id);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: result.content }} />
    </>
  );
};

export default RichTextViewer;
