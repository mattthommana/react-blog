import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className="relative group flex flex-nowrap py-3 px-4 pr-10 rounded-lg border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-75 ease-in-out"
    >
      <div className="flex flex-col flex-1 truncate">
        <div className="font-semibold">
          {post.title}
          {post.isPremium && (
            <span className="ml-2 inline-block py-1 px-2 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              Premium
            </span>
          )}
        </div>
        <div className="text-sm">
          {post.description}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formatDate(new Date(post.date))}
        </div>
      </div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        className="absolute top-1/2 right-2 -translate-y-1/2 size-5 stroke-2 fill-none stroke-current"
      >
        <line x1="5" y1="12" x2="19" y2="12" className="translate-x-3 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-75 ease-in-out" />
        <polyline points="12 5 19 12 12 19" className="-translate-x-1 group-hover:translate-x-0 transition-transform duration-75 ease-in-out" />
      </svg>
    </Link>
  );
};

export default BlogCard;