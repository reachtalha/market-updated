import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function POST(req: Request) {
  const { stripeConnectId, amount } = await req.json();
  try {
    const balance = await stripe.balance.retrieve({ stripeAccount: stripeConnectId });

    const currentBalance = balance;

    console.log(currentBalance);

    return NextResponse.json(currentBalance);
  } catch (err: any) {
    return NextResponse.json({
      message: err || 'Something Went Wrong'
    });
  }
}
