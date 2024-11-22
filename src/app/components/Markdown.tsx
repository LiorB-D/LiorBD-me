import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
export default function MarkdownBlock({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  return (
    <Markdown
      className={className}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeStringify]}
      components={{
        h1: ({ ...props }) => <h1 className="mt-10 text-4xl mb-4" {...props} />,
        h2: ({ ...props }) => <h2 className="mt-8 text-2xl" {...props} />,
        h3: ({ ...props }) => <h3 className="mt-6 text-xl" {...props} />,
        p: ({ ...props }) => <p className="mt-3" {...props} />,
        a: ({ ...props }) => (
          <a
            className="cursor-pointer underline text-blue-800"
            target="_blank"
            {...props}
          />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className="my-6 border-l-4 border-gray-300 pl-2"
            {...props}
          />
        ),
        li: ({ ...props }) => <li className="list-disc ml-4 mt-1" {...props} />,
        hr: ({ ...props }) => (
          <div className="h-[0.8px] my-6 bg-slate-300 " {...props} />
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
