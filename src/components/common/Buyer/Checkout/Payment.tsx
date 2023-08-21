'use client';
import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useSwr from 'swr';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import useCartStore from '@/state/useCartStore';

const stripePromise = loadStripe(
  'pk_test_51IxrvoH0toQxYCC9i27HVt4NJLtJdQ2e1bUfMR1YeXoxG2yHbFkMhmrQGd1wCCHwpYSZBFJ2lOV9G9mvCngDLUUI00gdddAJAF'
);

const fetchCreatePaymentIntent = (price: number) => {
  return axios.post('/api/payment/createPayment', {
    price
  });
};

const Payment = ({ children }: { children: ReactNode }) => {
  const { cart, isCartLoading } = useCartStore((state: any) => state);
  const { data, isLoading } = useSwr(
    () => (cart?.summary?.total != null ? 'payment_intent_creation' : null),
    () => fetchCreatePaymentIntent(cart?.summary?.total),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    }
  );

  return isLoading || cart?.summary?.total == null ? (
    <Skeleton className="h-[100px] w-full bg-gray-200" />
  ) : (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: data?.data?.payload?.clientSecret || '' }}
    >
      {children}
    </Elements>
  );
};

export default Payment;
