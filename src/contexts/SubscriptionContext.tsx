import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, Subscription as ApiSubscription } from '../services/api';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'expired' | 'inactive';
  expiryDate: string;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  subscriptions: ApiSubscription[];
  subscribe: (planId: string) => void;
  isVip: boolean;
  renewSubscription: () => void;
  loadSubscriptions: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);

  useEffect(() => {
    // Check for stored subscription on mount
    const storedSubscription = localStorage.getItem('prf_subscription');
    if (storedSubscription) {
      setSubscription(JSON.parse(storedSubscription));
    }
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    // Subscriptions endpoint temporarily disabled
    console.log('Subscriptions endpoint disabled');
  };
  const subscribe = (planId: string) => {
    const newSubscription = {
      id: Date.now().toString(),
      plan: planId,
      status: 'active' as const,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    setSubscription(newSubscription);
    localStorage.setItem('prf_subscription', JSON.stringify(newSubscription));
    loadSubscriptions(); // Reload to get updated data
  };

  const renewSubscription = () => {
    if (subscription) {
      const renewed = {
        ...subscription,
        status: 'active' as const,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
      setSubscription(renewed);
      localStorage.setItem('prf_subscription', JSON.stringify(renewed));
    }
  };

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      subscriptions,
      subscribe,
      isVip: subscription?.status === 'active',
      renewSubscription,
      loadSubscriptions
    }}>
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