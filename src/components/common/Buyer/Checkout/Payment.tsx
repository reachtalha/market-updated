'use client';
import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useSwr from 'swr';
import axios from 'axios';
import { auth } from '@/lib/firebase/client';
import useCartStore from '@/state/useCartStore';
import BoxedContent from '../../BoxedContent';
import useGuestCartStore from '@/state/useGuestCartStore';

const stripePromise = loadStripe(
  'pk_test_51IxrvoH0toQxYCC9i27HVt4NJLtJdQ2e1bUfMR1YeXoxG2yHbFkMhmrQGd1wCCHwpYSZBFJ2lOV9G9mvCngDLUUI00gdddAJAF'
);

const fetchCreatePaymentIntent = (price: number) => {
  return axios.post('/api/payment/createPayment', {
    price
  });
};

const Payment = ({ children }: { children: ReactNode }) => {
  const { cart } = useCartStore((state: any) => state);
  const { guestCart } = useGuestCartStore((state: any) => state);

  const cartTotal = auth.currentUser ? cart?.summary?.total : guestCart?.summary?.total;
  const { data, isLoading } = useSwr(
    () => (cartTotal != null ? 'payment_intent_creation' : null),
    () => fetchCreatePaymentIntent(cartTotal),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    }
  );

  return isLoading || cartTotal == null ? (
    <BoxedContent className="flex gap-x-5 py-24 mt-8">
      <div className="grid lg:grid-cols-2 gap-x-10">
        <div className="h-4/5 w-full bg-gray-200 animate-pulse" />
        <div className="h-96 w-full bg-gray-200 animate-pulse" />
      </div>
    </BoxedContent>
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
