import React, { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import MathRenderer from './MathRenderer';
import CodeBlock from './CodeBlock';

// Define component props interfaces
interface HeadingProps {
  children?: ReactNode;
  id?: string;
}

interface LinkProps {
  children?: ReactNode;
  href: string;
}

interface CodeProps {
  children: string;
  className?: string;
}

interface MathProps {
  children: string;
}

interface GenericProps {
  children?: ReactNode;
  [key: string]: any;
}

interface ImgProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  [key: string]: any;
}

/**
 * Custom components for MDX content
 */
const components = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-xl font-bold mt-5 mb-2" {...props}>
      {children}
    </h3>
  ),
  
  p: ({ children }: GenericProps) => <p className="my-4">{children}</p>,
  
  a: ({ children, href, ...props }: LinkProps) => (
    <a 
      href={href} 
      className="text-blue-600 dark:text-blue-400 hover:underline" 
      {...props}
    >
      {children}
    </a>
  ),
  
  ul: ({ children }: GenericProps) => <ul className="list-disc pl-5 my-4">{children}</ul>,
  
  ol: ({ children }: GenericProps) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  
  li: ({ children }: GenericProps) => <li className="mb-1">{children}</li>,
  
  blockquote: ({ children }: GenericProps) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
      {children}
    </blockquote>
  ),
  
  code: ({ children, className }: CodeProps) => {
    // If it's an inline code block (no language specified)
    if (!className) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    
    // For code blocks with language
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  
  // Custom components
  Math: ({ children }: MathProps) => <MathRenderer math={children} />,
  
  InlineMath: ({ children }: MathProps) => (
    <MathRenderer math={children} inline={true} />
  ),
  
  // Image with better styling
  img: (props: ImgProps) => (
    <img
      {...props}
      className="max-w-full h-auto rounded-lg my-4"
      loading="lazy"
    />
  ),
};

interface MDXComponentsProps {
  children: ReactNode;
}

/**
 * Provider for MDX components
 */
const MDXComponents: React.FC<MDXComponentsProps> = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXComponents;
export { components };