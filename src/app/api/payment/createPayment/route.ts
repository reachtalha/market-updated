import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const calculatePlatformFee = (price: number) => {
  const platformFeePercentage = 5; // Platform fee percentage
  const platformFee = (price * platformFeePercentage) / 100; // Calculate platform fee
  return Number((platformFee * 100).toFixed(0));
};

export async function POST(req: Request) {
  const { price, stripeAccountId } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
    apiVersion: '2022-11-15'
  });

  try {
    const amount = Number((price * 100).toFixed(0));

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: amount,
      currency: 'usd',
      application_fee_amount: calculatePlatformFee(amount),
      transfer_data: {
        destination: stripeAccountId
      }
    });

    return NextResponse.json({
      payload: { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret }
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Something went wrong!' });
  }
}
