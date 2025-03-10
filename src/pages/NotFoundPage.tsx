import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/layout/Head'

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Head
        title="Page Not Found | Matter St. Blog"
        description="The page you're looking for doesn't exist."
      />

      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;