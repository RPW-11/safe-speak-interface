import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy } from 'lucide-react';

interface MarkdownDisplayerProps {
  markdownText: string;
}

type CodeProps = {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const MarkdownDisplayer = ({ markdownText }: MarkdownDisplayerProps) => {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };
  
  return (
    <div className="font-sans text-base leading-relaxed overflow-hidden max-w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            const code = String(children).replace(/\n$/, '');
            
            return !inline && match ? (
              <div className="relative my-2 rounded-lg overflow-hidden border border-zinc-700/50 bg-zinc-900/95">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/80 text-zinc-300 text-xs font-mono">
                  <span>{match[1]}</span>
                  <button 
                    onClick={() => copyToClipboard(code)}
                    className="p-1 hover:bg-zinc-700 rounded transition-colors duration-200"
                    title="Copy code"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-b-lg text-sm"
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                  }}
                  {...props}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="px-1.5 py-0.5 rounded-md bg-secondary/50 dark:bg-zinc-800 text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <table
                className="w-full text-sm rounded-lg border-collapse"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="border-b border-zinc-300 dark:border-zinc-700 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 font-semibold text-left"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="leading-7 mb-4 last:mb-0" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="pl-1" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500/70 pl-4 my-6 py-1 bg-blue-50/50 dark:bg-blue-900/20 rounded-r text-zinc-700 dark:text-zinc-300"
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre className="overflow-hidden rounded-lg my-2 text-sm" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1
              className="text-2xl sm:text-3xl font-bold mt-8 mb-4 pb-1 border-b border-zinc-200 dark:border-zinc-800"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-xl sm:text-2xl font-semibold mt-6 mb-3"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-lg sm:text-xl font-semibold mt-5 mb-2"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img
              className="max-w-96 h-auto rounded-lg my-5 mx-auto border border-zinc-200 dark:border-zinc-700"
              {...props}
              loading="lazy"
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-zinc-200 dark:border-zinc-800" {...props} />
          ),
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplayer;