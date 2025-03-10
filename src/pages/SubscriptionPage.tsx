import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import LoadingSpinner from '../components/layout/LoadingSpinner';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'price_monthly', // This should match your Stripe price ID
    name: 'Monthly Plan',
    price: 9.99,
    interval: 'month',
    features: [
      'Access to all premium articles',
      'Early access to new content',
      'Monthly newsletter',
      'Priority support',
    ],
  },
  {
    id: 'price_yearly', // This should match your Stripe price ID
    name: 'Yearly Plan',
    price: 99.99,
    interval: 'year',
    features: [
      'Access to all premium articles',
      'Early access to new content',
      'Monthly newsletter',
      'Priority support',
      '17% discount compared to monthly',
    ],
  },
];

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(pricingPlans[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const stripe = useStripe();
  const elements = useElements();
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const { hasActiveSubscription, subscription, isLoading: subscriptionLoading, cancelSubscription } = useSubscription();

  // If still loading auth or subscription status, show loading spinner
  if (authLoading || subscriptionLoading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    login();
    return <LoadingSpinner />;
  }

  // Handle submitting new subscription
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // For demo purposes just alert
      alert(`Subscribing to ${selectedPlan.name} at $${selectedPlan.price}/${selectedPlan.interval}!`);
      
      // In a real app, you'd call:
      // await createSubscription(selectedPlan.id);
      
      // For demo purposes, refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Subscription error:', error);
      setErrorMessage('Failed to create subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancellation of active subscription
  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      setIsLoading(true);
      try {
        await cancelSubscription();
        alert('Subscription successfully cancelled.');
      } catch (error) {
        console.error('Error cancelling subscription:', error);
        setErrorMessage('Failed to cancel subscription. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Subscription | Matter St. Blog</title>
        <meta name="description" content="Subscribe to access premium content" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">
          {hasActiveSubscription ? 'Manage Your Subscription' : 'Choose a Subscription Plan'}
        </h1>

        {hasActiveSubscription ? (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Subscription</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Plan:</span>
                <span>{subscription?.plan.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Status:</span>
                <span className="capitalize">{subscription?.status}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Price:</span>
                <span>${(subscription?.plan.amount || 0) / 100}/{subscription?.plan.interval}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Renews on:</span>
                <span>
                  {subscription?.currentPeriodEnd
                    ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                    : 'Unknown'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleCancelSubscription}
              disabled={isLoading}
              className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Cancel Subscription'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`
                    border rounded-lg p-4 cursor-pointer
                    ${selectedPlan.id === plan.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-700'}
                  `}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">{plan.name}</h3>
                    <div>
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /{plan.interval}
                      </span>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="ml-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Payment Information</h3>
              <div className="rounded-md border border-gray-300 dark:border-gray-700 p-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || isLoading}
              className={`
                w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-blue-500
                ${isLoading || !stripe ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? 'Processing...' : `Subscribe $${selectedPlan.price}/${selectedPlan.interval}`}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SubscriptionPage;