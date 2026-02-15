import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="space-y-4 text-slate-200">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="mb-3 text-3xl font-bold">{children}</h1>,
          h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold">{children}</h2>,
          p: ({ children }) => <p className="leading-7 text-slate-200">{children}</p>,
          a: ({ href, children }) => (
            <a href={href} className="text-primary underline-offset-4 hover:underline">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
          code: ({ children }) => (
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-primary">
              {children as ReactNode}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-auto rounded-lg bg-slate-900 p-4">{children}</pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
