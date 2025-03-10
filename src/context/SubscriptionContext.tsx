import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';
import { useAuth } from './AuthContext';
import { SubscriptionContextType, Subscription } from '../types';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, getToken } = useAuth();
  const stripe = useStripe();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      
      const response = await axios.get('/api/subscription', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setSubscription(response.data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription(null);
      
      // For demo purposes, mock a subscription
      // Remove this in production
      setSubscription({
        id: 'mock-subscription',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        plan: {
          id: 'price_monthly',
          name: 'Monthly Plan',
          amount: 999,
          currency: 'usd',
          interval: 'month',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createSubscription = async (priceId: string) => {
    if (!stripe) return;
    
    try {
      const token = await getToken();
      
      // Create a checkout session
      const response = await axios.post(
        '/api/create-checkout-session',
        { priceId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Redirect to Stripe Checkout
      const { sessionId } = response.data;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  };

  const cancelSubscription = async () => {
    try {
      const token = await getToken();
      
      await axios.post(
        '/api/cancel-subscription',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      await fetchSubscription();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  };

  const hasActiveSubscription = Boolean(
    subscription && ['active', 'trialing'].includes(subscription.status)
  );

  const value = {
    hasActiveSubscription,
    subscription,
    isLoading,
    createSubscription,
    cancelSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}