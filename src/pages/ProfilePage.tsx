import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import Head from '../components/layout/Head';

const ProfilePage: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();
  const { hasActiveSubscription, subscription, isLoading: subscriptionLoading } = useSubscription();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (authLoading || subscriptionLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <Head
        title="Profile | Matter St. Blog"
        description="Your profile on Matter St. Blog"
      />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Your Profile</h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-20 w-20 rounded-full"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {user?.name?.charAt(0) || '?'}
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Subscription Status</h2>
          </div>
          <div className="p-6">
            {hasActiveSubscription ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Active Subscription</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You have access to all premium content
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <h3 className="font-medium mb-2">Subscription Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600 dark:text-gray-400">Plan:</div>
                    <div>{subscription?.plan.name}</div>
                    
                    <div className="text-gray-600 dark:text-gray-400">Price:</div>
                    <div>${(subscription?.plan.amount || 0) / 100}/{subscription?.plan.interval}</div>
                    
                    <div className="text-gray-600 dark:text-gray-400">Renewal Date:</div>
                    <div>
                      {subscription?.currentPeriodEnd
                        ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                        : 'Unknown'}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Link
                    to="/subscribe"
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                  >
                    Manage Subscription
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">No Active Subscription</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Subscribe to access premium content
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Link
                    to="/subscribe"
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Subscribe Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Account Settings</h2>
          </div>
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;