import React from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  // Extract language from className (format: "language-xxx")
  const language = className ? className.replace('language-', '') : '';
  
  // In a real app, you'd use a syntax highlighter library like Prism.js or highlight.js
  // For simplicity, we're just using basic styling here
  
  return (
    <div className="relative group">
      {language && (
        <div className="absolute right-2 top-2 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
          {language}
        </div>
      )}
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4 text-sm">
        <code className={className}>{children}</code>
      </pre>
      <button
        className="absolute hidden group-hover:block right-2 bottom-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
        onClick={() => {
          navigator.clipboard.writeText(children);
          // In a real app, you'd show a toast notification here
          alert('Code copied to clipboard!');
        }}
      >
        Copy
      </button>
    </div>
  );
};

export default CodeBlock;