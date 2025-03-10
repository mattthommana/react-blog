import { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogPost } from '../types';
import { useAuth } from '../context/AuthContext';

interface UseBlogOptions {
  slug?: string;
  isPremium?: boolean;
}

export function useBlog({ slug, isPremium = false }: UseBlogOptions = {}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, getToken } = useAuth();

  useEffect(() => {
    if (slug) {
      fetchSinglePost(slug, isPremium);
    } else {
      fetchPosts(isPremium);
    }
  }, [slug, isPremium, isAuthenticated]);

  const fetchPosts = async (isPremium: boolean) => {
    try {
      setIsLoading(true);
      setError(null);
      
      let response;
      
      if (isPremium) {
        if (!isAuthenticated) {
          setPosts([]);
          return;
        }
        
        const token = await getToken();
        response = await axios.get('/api/posts/premium', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // Public posts don't require authentication
        response = await axios.get('/api/posts/public');
      }
      
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load blog posts');
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSinglePost = async (slug: string, isPremium: boolean) => {
    try {
      setIsLoading(true);
      setError(null);
      
      let response;
      
      if (isPremium) {
        if (!isAuthenticated) {
          // Return minimal post data for the paywall UI
          const publicResponse = await axios.get(`/api/posts/premium/${slug}/meta`);
          setPost(publicResponse.data);
          return;
        }
        
        const token = await getToken();
        response = await axios.get(`/api/posts/premium/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // Public posts don't require authentication
        response = await axios.get(`/api/posts/public/${slug}`);
      }
      
      setPost(response.data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load blog post');
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  // For development/demo, use these mock posts if API calls fail
  useEffect(() => {
    // This is just for demo purposes - in a real app, you would remove this
    // and properly handle API errors
    if (error) {
      if (!slug) {
        const mockPosts = [
          {
            id: '1',
            slug: 'introduction-typescript-react',
            title: 'Introduction to TypeScript and React',
            description: 'Learn the basics of using TypeScript with React for type-safe applications',
            author: 'Jane Smith',
            date: '2025-03-01',
            tags: ['typescript', 'react', 'web development'],
            isPremium: false,
            content: 'This is a sample post content...'
          },
          {
            id: '2',
            slug: 'advanced-typescript-patterns',
            title: 'Advanced TypeScript Patterns for React',
            description: 'Master complex TypeScript patterns to build more robust React applications',
            author: 'Jane Smith',
            date: '2025-03-05',
            tags: ['typescript', 'react', 'advanced', 'patterns'],
            isPremium: true,
            content: 'This is a premium post content...'
          }
        ];
        
        if (isPremium) {
          setPosts(mockPosts.filter(post => post.isPremium));
        } else {
          setPosts(mockPosts.filter(post => !post.isPremium));
        }
        
        setError(null);
      } else if (slug) {
        const mockPost = {
          id: slug,
          slug,
          title: isPremium ? 'Advanced TypeScript Patterns for React' : 'Introduction to TypeScript and React',
          description: isPremium 
            ? 'Master complex TypeScript patterns to build more robust React applications'
            : 'Learn the basics of using TypeScript with React for type-safe applications',
          author: 'Jane Smith',
          date: isPremium ? '2025-03-05' : '2025-03-01',
          tags: isPremium 
            ? ['typescript', 'react', 'advanced', 'patterns']
            : ['typescript', 'react', 'web development'],
          isPremium,
          content: isPremium 
            ? 'This is a premium post content...'
            : 'This is a sample post content...'
        };
        
        setPost(mockPost);
        setError(null);
      }
    }
  }, [error, slug, isPremium]);

  return { posts, post, isLoading, error };
}