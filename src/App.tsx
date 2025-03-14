import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/layout/LoadingSpinner';
import MDXComponents from './components/blog/MDXComponents';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PremiumBlogPostPage = lazy(() => import('./pages/PremiumBlogPostPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Initialize Stripe
const stripePromise = loadStripe(import.meta.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Elements stripe={stripePromise}>
          <MDXComponents>
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blog" element={<BlogListPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/premium/:slug" element={<PremiumBlogPostPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/subscribe" element={<SubscriptionPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
          </MDXComponents>
        </Elements>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;