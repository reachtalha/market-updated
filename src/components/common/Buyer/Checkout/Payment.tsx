"use client"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '@/components/common/Buyer/Checkout/CheckoutForm';
import useSwr from 'swr';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

const stripePromise = loadStripe('pk_test_51IxrvoH0toQxYCC9i27HVt4NJLtJdQ2e1bUfMR1YeXoxG2yHbFkMhmrQGd1wCCHwpYSZBFJ2lOV9G9mvCngDLUUI00gdddAJAF');




const fetchCreatePaymentIntent = () => {
  return axios.get('/api/payment/createPayment');
}

const Payment = () => {
  const { data, isLoading } = useSwr('payment_intent_creation', fetchCreatePaymentIntent, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  return isLoading ? <Skeleton className="h-[100px] w-full bg-gray-200" /> : (
   <Elements stripe={stripePromise} options={{ clientSecret: data?.data?.payload.clientSecret }}>
      <CheckoutForm />
    </Elements>
  )
};

export default Payment;