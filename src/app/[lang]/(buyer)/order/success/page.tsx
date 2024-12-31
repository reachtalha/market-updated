import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import BoxedContent from '@/components/common/BoxedContent';
import { Stripe } from 'stripe';
import OrderSuccessComponent from './Success';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2022-11-15' });

export default async function OrderSuccess({
  searchParams: { payment_intent }
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!payment_intent) {
    return notFound();
  }
  const paymentIntentRes = await stripe.paymentIntents.retrieve(payment_intent as string);

  if (paymentIntentRes?.status === 'succeeded') {
    return (
      <BoxedContent className="flex flex-col items-center justify-center py-24 min-h-[80vh] mt-20">
        <OrderSuccessComponent />
      </BoxedContent>
    );
  }
  return notFound();
}
