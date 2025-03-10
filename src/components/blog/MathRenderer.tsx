import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  math: string;
  inline?: boolean;
  className?: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ 
  math, 
  inline = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: !inline,
          throwOnError: false,
          output: "html",
          trust: true,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    }
  }, [math, inline]);

  return (
    <div 
      ref={containerRef} 
      className={`${inline ? 'inline-block' : 'block my-6 text-center'} ${className}`}
      aria-label={`Math equation: ${math}`}
    />
  );
};

export default MathRenderer;