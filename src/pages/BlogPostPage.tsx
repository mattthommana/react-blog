import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MDXProvider } from '@mdx-js/react';
import { useBlog } from '../hooks/useBlog';
import BlogHeader from '../components/blog/BlogHeader';
import MathRenderer from '../components/blog/MathRenderer';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';

// Custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  p: (props: any) => <p className="my-4" {...props} />,
  a: (props: any) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-5 my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 my-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />
  ),
  code: (props: any) => {
    const { children, className } = props;
    const language = className ? className.replace('language-', '') : '';
    return (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4">
        <code className={className}>{children}</code>
      </pre>
    );
  },
  // Custom component for rendering math equations
  math: (props: any) => <MathRenderer math={props.children} />,
  inlineMath: (props: any) => <MathRenderer math={props.children} inline={true} />,
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading, error } = useBlog({ slug, isPremium: false });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <Navigate to="/blog" />;

  // The Content component is the React component generated from MDX
  const Content = post.content as React.ComponentType;

  return (
    <>
      <Helmet>
        <title>{post.title} | Matter St. Blog</title>
        <meta name="description" content={post.description} />
      </Helmet>
      
      <div className="animate">
        <Link 
          to="/blog" 
          className="relative group w-fit flex pl-7 pr-3 py-1.5 flex-nowrap rounded border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-75 ease-in-out"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            className="absolute top-1/2 left-2 -translate-y-1/2 size-4 stroke-2 fill-none stroke-current"
          >
            <line x1="5" y1="12" x2="19" y2="12" className="translate-x-2 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-75 ease-in-out" />
            <polyline points="12 5 5 12 12 19" className="translate-x-1 group-hover:translate-x-0 transition-transform duration-75 ease-in-out" />
          </svg>
          <div className="text-sm">
            Blogs
          </div>
        </Link>
      </div>
      
      <article className="max-w-3xl mx-auto mt-8">
        <BlogHeader post={post} />
        <MDXProvider components={components}>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <Content />
          </div>
        </MDXProvider>
      </article>
    </>
  );
};

export default BlogPostPage;