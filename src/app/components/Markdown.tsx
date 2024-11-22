import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import React from "react";
import rehypeRaw from "rehype-raw";
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
      rehypePlugins={[rehypeKatex, rehypeRaw, rehypeStringify]}
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
        ul: ({ ...props }) => <ul className="list-disc" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal" {...props} />,
        li: ({ ...props }) => <li className="ml-4 mt-1" {...props} />,
        hr: ({ ...props }) => (
          <div className="h-[0.8px] my-6 bg-slate-300 " {...props} />
        ),
        code: ({ ...props }) => (
          <span className="bg-slate-800 text-white rounded-md p-1" {...props} />
        ),
        pre: ({ ...props }) => {
          return (
            <div className="">
              <pre className="mt-2 bg-slate-800 text-white rounded-md p-4 whitespace-pre-wrap overflow-x-scroll">
                {props.children}
              </pre>
            </div>
          );
        },
        aside: ({ ...props }) => (
          <aside className="bg-slate-200 p-4 rounded-md my-6" {...props} />
        ),
        iframe: ({ ...props }) => <iframe className="my-6" {...props}></iframe>,
        img: ({ ...props }) => <img className="mx-auto my-6" {...props} />,
      }}
    >
      {content}
    </Markdown>
  );
}
