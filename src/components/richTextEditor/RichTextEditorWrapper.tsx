'use client';

import RichTextEditor from '@/components/richTextEditor/RichTextEditor';

interface RichTextEditorWrapperProps {
    content: string;
    onChange: (content: string) => void;
}

const RichTextEditorWrapper: React.FC<RichTextEditorWrapperProps> = ({ content, onChange }) => {
    return <RichTextEditor onChange={onChange} />;
};

export default RichTextEditorWrapper;