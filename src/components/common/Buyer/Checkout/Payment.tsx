'use client';
import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useSwr from 'swr';
import axios from 'axios';
import { auth } from '@/lib/firebase/client';
import useCartStore from '@/state/useCartStore';
import useGuestCartStore from '@/state/useGuestCartStore';
import BoxedContent from '../../BoxedContent';

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
  const { data } = useSwr(
    () => (cartTotal != null ? 'payment_intent_creation' : null),
    () => fetchCreatePaymentIntent(cartTotal, cartDetails),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false
    }
  );

  if (data?.data?.payload?.clientSecret) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: data?.data?.payload?.clientSecret || '' }}
      >
        {children}
      </Elements>
    );
  }

  return (
    <BoxedContent className="my-28 bg-gray-100 p-5 lg:p-10 grid rounded-lg grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
      <div className="h-[80vh] w-full bg-gray-200 rounded-md animate-pulse" />
      <div className="h-[40vh] w-full bg-gray-200 rounded-md animate-pulse" />
    </BoxedContent>
  );
};

export default Payment;
