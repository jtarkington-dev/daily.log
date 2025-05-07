import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownPreview = ({ content }) => (
  <div className="prose prose-invert max-w-none p-4 bg-zinc-900 text-white rounded overflow-y-auto h-full">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);

export default MarkdownPreview;
