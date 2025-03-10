import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSubscription } from '../../context/SubscriptionContext';
import { useAuth } from '../../context/AuthContext';

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

const SubscriptionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(pricingPlans[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const stripe = useStripe();
  const elements = useElements();
  const { createSubscription } = useSubscription();
  const { isAuthenticated, login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated) {
      login();
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await createSubscription(selectedPlan.id);
      // The user will be redirected to Stripe Checkout
      // The rest of the subscription process will be handled by the return URL
    } catch (error) {
      console.error('Subscription error:', error);
      setErrorMessage('Failed to create subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Choose a Plan
                    </h3>
                    <div className="mt-4 space-y-4">
                      {pricingPlans.map((plan) => (
                        <div key={plan.id} className="relative">
                          <div
                            className={`
                              border rounded-lg p-4 cursor-pointer
                              ${selectedPlan.id === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                            `}
                            onClick={() => setSelectedPlan(plan)}
                          >
                            <div className="flex justify-between">
                              <h4 className="text-lg font-medium">{plan.name}</h4>
                              <div>
                                <span className="text-2xl font-bold">${plan.price}</span>
                                <span className="text-gray-500">
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
                        </div>
                      ))}
                    </div>
                  </div>

                  {isAuthenticated && (
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Payment Information
                      </h3>
                      <div className="mt-4">
                        <div className="rounded-md border border-gray-300 p-4">
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
                    </div>
                  )}
                </div>
              </div>

              {errorMessage && (
                <div className="px-4 py-3 bg-red-50 text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={!stripe || isLoading}
                  className={`
                    inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                    text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${isLoading || !stripe ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isLoading ? 'Processing...' : isAuthenticated ? 'Subscribe Now' : 'Sign in to Subscribe'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;