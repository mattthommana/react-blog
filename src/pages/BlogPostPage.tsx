import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import Head from '../components/layout/Head';
import BlogHeader from '../components/blog/BlogHeader';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading, error } = useBlog({ slug, isPremium: false });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <Navigate to="/blog" />;

  return (
    <>
      <Head 
        title={`${post.title} | Matter St. Blog`}
        description={post.description}
      />
      
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
        <MarkdownRenderer content={post.content as string} />
      </article>
    </>
  );
};

export default BlogPostPage;