"use client"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '@/components/common/Buyer/Checkout/CheckoutForm';

const stripePromise = loadStripe('pk_test_51IxrvoH0toQxYCC9i27HVt4NJLtJdQ2e1bUfMR1YeXoxG2yHbFkMhmrQGd1wCCHwpYSZBFJ2lOV9G9mvCngDLUUI00gdddAJAF');

const Payment = () => {
  return (
   <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
};

export default Payment;