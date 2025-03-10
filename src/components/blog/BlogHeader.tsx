import React from 'react';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { calculateReadingTime } from '../../utils/textUtils';

interface BlogHeaderProps {
  post: BlogPost;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ post }) => {
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="space-y-4 mb-8">
      {post.isPremium && (
        <div className="inline-block py-1 px-3 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          Premium Content
        </div>
      )}
      <h1 className="text-3xl font-semibold tracking-tight lg:leading-snug lg:text-4xl">
        {post.title}
      </h1>
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <span>By {post.author}</span>
        <span>•</span>
        <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
        <span>•</span>
        <span>{readingTime} min read</span>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogHeader;