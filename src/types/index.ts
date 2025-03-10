import { ComponentType } from 'react';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string | ComponentType;  // Can be a string or an MDX component
  author: string;
  date: string;
  tags: string[];
  isPremium: boolean;
  coverImage?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'trialing';
  currentPeriodEnd: string;
  plan: {
    id: string;
    name: string;
    amount: number;
    currency: string;
    interval: 'month' | 'year';
  };
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  getToken: () => Promise<string>;
};

export type SubscriptionContextType = {
  hasActiveSubscription: boolean;
  subscription: Subscription | null;
  isLoading: boolean;
  createSubscription: (priceId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
};

export type Site = {
  name: string;
  email: string;
  numPostsOnHomepage: number;
  numWorksOnHomepage: number;
};

export type Metadata = {
  title: string;
  description: string;
};

export type Social = {
  name: string;
  href: string;
};