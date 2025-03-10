import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import BlogCard from '../components/blog/BlogCard';
import AuthorProfile from '../components/AuthorProfile';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import Head from '../components/layout/Head';
import { BlogPost } from '../types';

const HomePage: React.FC = () => {
  const { posts, isLoading, error } = useBlog({ isPremium: false });
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (posts.length > 0) {
      setLatestPosts(posts.slice(0, 3));
    }
  }, [posts]);

  return (
    <>
      <Head 
        title="Matter St. Blog - Home"
        description="A blog about software, performance, and engineering."
      />

      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight lg:leading-snug lg:text-4xl mb-4">
            Hello Readers! 👋🏾
          </h1>
        </section>

        <AuthorProfile
          name="Matthew Thommana"
          imageSrc="/matthew.webp"
          description="My name is Matthew Thommana. I'm a software engineer focused on creating highly impactful performance software. I mostly blog about software performance, technical leadership, and fun engineering."
        />

        <section className="space-y-6">
          <div className="flex flex-wrap gap-y-2 items-center justify-between">
            <h2 className="font-semibold text-black dark:text-white">Latest posts</h2>
            <Link 
              to="/blog" 
              className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black border-2 border-black hover:bg-black hover:text-white transition-colors dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
            >
              See all posts
            </Link>
          </div>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <ul className="flex flex-col gap-4">
              {latestPosts.map((post) => (
                <li key={post.id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap gap-y-2 items-center justify-between">
            <h2 className="font-semibold text-black dark:text-white">Work</h2>
            <Link 
              to="/about" 
              className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black border-2 border-black hover:bg-black hover:text-white transition-colors dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
            >
              See all work
            </Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="animate border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="text-sm opacity-75">Oct 2024 - Present</div>
              <div className="font-semibold text-black dark:text-white">Anduril</div>
              <div className="text-sm opacity-75">Staff Software Engineer</div>
              <div className="text-sm opacity-75">Washington, DC</div>
              <ul className="ml-4 list-disc space-y-1 pt-2">
                <li>Contributing to the development of <strong>next-generation defense capabilities</strong> through advanced software engineering and systems integration</li>
              </ul>
            </div>
            
            <div className="animate border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="text-sm opacity-75">Feb 2020 - Oct 2024</div>
              <div className="font-semibold text-black dark:text-white">
                The Johns Hopkins University Applied Physics Laboratory
              </div>
              <div className="text-sm opacity-75">Senior AI Systems Engineer, Principal Investigator</div>
              <div className="text-sm opacity-75">Laurel, MD</div>
              <ul className="ml-4 list-disc space-y-1 pt-2">
                <li>Led Electronic Warfare portfolio for Intelligent Combat Platforms, <strong>scaling portfolio value from $0 to over $2 million</strong> through strategic program development</li>
                <li><strong>Technical Lead</strong> on major DoD autonomy initiatives including <strong>AFRL Golden Horde and DARPA ACE/AIRS</strong></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;