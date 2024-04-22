import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function POST(req: Request) {
  const { stripeConnectId, amount } = await req.json();

  try {
    const balance = await stripe.balance.retrieve({ stripeAccount: stripeConnectId });
    console.log(balance);

    console.log(stripeConnectId, amount);

    const payout = await stripe.payouts.create(
      {
        amount: Number((amount * 100).toFixed(0)),
        currency: 'usd'
      },
      {
        stripeAccount: stripeConnectId
      }
    );

    console.log(payout);

    return NextResponse.json('Success');
  } catch (err: any) {
    return NextResponse.json({
      message: err?.message || 'Something went wrong!'
    });
  }
}
