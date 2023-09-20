import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

export async function POST(req: Request) {
  const { price } = await req.json();
  const stripe = new Stripe(
    process.env.STRIPE_SECRET || "",
    {
      apiVersion: '2022-11-15'
    }
  );

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: Number((price * 100).toFixed(0)),
      currency: 'usd'
    });

    return NextResponse.json({
      payload: { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret }
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Something went wrong!' });
  }
}
