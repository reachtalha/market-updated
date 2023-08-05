import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useSwr from 'swr';
import axios from 'axios';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const options = {
  hidePostalCode: true,
  style: {
    base: {
      color: "#32325d",
      fontSize: "14px",
      fontFamily: "var(--font-america)",
      "::placeholder": {
        color: "#aab7c4"
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
}

const fetchCreatePaymentIntent = () => {
  return axios.get('/api/payment/createPayment');
}

export default function CheckoutForm () {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();
  const { data, isLoading } = useSwr('payment_intent_creation', fetchCreatePaymentIntent, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    const result = await stripe.confirmCardPayment(data?.data?.payload?.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Dawood'
        }
      }
    });

    if (result.error) {
      setError(`Payment failed: ${result.error.message}`);
      setProcessing(false);
    } else {
      setProcessing(false);
    }
  };


  return isLoading ? <Skeleton className="h-[100px] w-full bg-gray-200" /> : (
    <form onSubmit={handleSubmit}>
      <div className="w-full rounded-md border border-slate-200 border-slate-200 bg-white p-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800">
        <CardElement options={options} />
      </div>
      {/*<button disabled={!stripe}>Submit</button>*/}
    </form>
  )
};
