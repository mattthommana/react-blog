import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SubscriptionCTA: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  const handleAction = () => {
    if (!isAuthenticated) {
      login();
    }
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
        Unlock Premium Content
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Get access to premium articles, in-depth analysis, and exclusive content by subscribing to our premium plan.
      </p>
      <ul className="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-300">
        <li>Access to all premium articles</li>
        <li>Early access to new content</li>
        <li>Advanced performance engineering tutorials</li>
        <li>Technical deep dives</li>
      </ul>
      
      {isAuthenticated ? (
        <Link
          to="/subscribe"
          className="inline-block w-full text-center py-3 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md shadow-sm transition-colors"
        >
          Subscribe Now
        </Link>
      ) : (
        <button
          onClick={handleAction}
          className="inline-block w-full text-center py-3 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md shadow-sm transition-colors"
        >
          Sign in to Subscribe
        </button>
      )}
    </div>
  );
};

export default SubscriptionCTA;