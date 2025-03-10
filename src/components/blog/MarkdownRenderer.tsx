import React from 'react';
import Markdown from 'markdown-to-jsx';
import MathRenderer from './MathRenderer';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeProps {
  children: string;
  className?: string;
}

interface HeadingProps {
  children?: React.ReactNode;
  id?: string;
}

interface MathBlockProps {
  children: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Match any math content within $$ delimiters
  const processMathBlocks = (markdown: string): string => {
    // Replace $$ math $$ blocks with custom math component syntax
    let processed = markdown.replace(/\$\$([\s\S]*?)\$\$/g, (_, mathContent) => {
      return `<MathBlock>${mathContent}</MathBlock>`;
    });
    
    // Replace inline $ math $ with inline math component syntax
    processed = processed.replace(/\$(.*?)\$/g, (_, mathContent) => {
      return `<InlineMath>${mathContent}</InlineMath>`;
    });
    
    return processed;
  };

  const processedContent = processMathBlocks(content);

  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <Markdown
        options={{
          forceBlock: true,
          overrides: {
            h1: {
              component: ({ children, ...props }: HeadingProps) => (
                <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>{children}</h1>
              )
            },
            h2: {
              component: ({ children, ...props }: HeadingProps) => (
                <h2 className="text-2xl font-bold mt-6 mb-3" {...props}>{children}</h2>
              )
            },
            h3: {
              component: ({ children, ...props }: HeadingProps) => (
                <h3 className="text-xl font-bold mt-5 mb-2" {...props}>{children}</h3>
              )
            },
            p: {
              component: ({ children, ...props }) => (
                <p className="my-4" {...props}>{children}</p>
              )
            },
            a: {
              component: ({ children, ...props }) => (
                <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props}>{children}</a>
              )
            },
            ul: {
              component: ({ children, ...props }) => (
                <ul className="list-disc pl-5 my-4" {...props}>{children}</ul>
              )
            },
            ol: {
              component: ({ children, ...props }) => (
                <ol className="list-decimal pl-5 my-4" {...props}>{children}</ol>
              )
            },
            blockquote: {
              component: ({ children, ...props }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props}>{children}</blockquote>
              )
            },
            code: {
              component: ({ children, className }: CodeProps) => (
                <CodeBlock className={className}>{children}</CodeBlock>
              )
            },
            pre: {
              component: ({ children }) => <>{children}</>
            },
            MathBlock: {
              component: ({ children }: MathBlockProps) => (
                <MathRenderer math={children.toString()} />
              )
            },
            InlineMath: {
              component: ({ children }: MathBlockProps) => (
                <MathRenderer math={children.toString()} inline={true} />
              )
            }
          }
        }}
      >
        {processedContent}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;