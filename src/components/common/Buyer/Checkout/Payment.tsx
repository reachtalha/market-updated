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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '');

const fetchCreatePaymentIntent = (price: number, cartDetails: any) => {
  return axios.post('/api/payment/createPayment', {
    price,
    cartDetails
  });
};

const Payment = ({ children }: { children: ReactNode }) => {
  const { cart } = useCartStore((state: any) => state);
  const { guestCart } = useGuestCartStore((state: any) => state);

  const cartTotal = auth.currentUser ? cart?.summary?.total : guestCart?.summary?.total;
  const cartDetails = auth.currentUser ? cart : guestCart;
  const { data, isLoading } = useSwr(
    () => (cartTotal != null ? 'payment_intent_creation' : null),
    () => fetchCreatePaymentIntent(cartTotal, cartDetails),
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
