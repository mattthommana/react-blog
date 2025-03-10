import React, { useEffect, useState } from 'react';
import Head from '../components/layout/Head'
import { useBlog } from '../hooks/useBlog';
import { useSubscription } from '../context/SubscriptionContext';
import BlogCard from '../components/blog/BlogCard';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { BlogPost } from '../types';

type GroupedPosts = {
  [year: string]: BlogPost[];
};

const BlogListPage: React.FC = () => {
  const { posts: freePosts, isLoading: freeLoading, error: freeError } = useBlog({ isPremium: false });
  const { posts: premiumPosts, isLoading: premiumLoading, error: premiumError } = useBlog({ isPremium: true });
  const { hasActiveSubscription } = useSubscription();
  
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({});
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const allPosts = [...freePosts];
    
    // Only add premium posts if user has an active subscription
    if (hasActiveSubscription) {
      allPosts.push(...premiumPosts);
    }
    
    // Sort posts by date (newest first)
    allPosts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    
    // Group posts by year
    const grouped = allPosts.reduce((acc: GroupedPosts, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});
    
    setGroupedPosts(grouped);
    setYears(Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a)));
  }, [freePosts, premiumPosts, hasActiveSubscription]);

  const isLoading = freeLoading || premiumLoading;
  const error = freeError || premiumError;

  return (
    <>
      <Head
        title="Blog | Matter St. Blog"
        description="Browse the Matter St. Blog"
      />

      <div className="space-y-10">
        <div className="font-semibold text-2xl text-black dark:text-white">
          Blog
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="space-y-10">
            {years.map((year) => (
              <section key={year} className="space-y-4">
                <div className="font-semibold text-xl text-black dark:text-white">
                  {year}
                </div>
                <div>
                  <ul className="flex flex-col gap-4">
                    {groupedPosts[year].map((post) => (
                      <li key={post.id}>
                        <BlogCard post={post} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogListPage;