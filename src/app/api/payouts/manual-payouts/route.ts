import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function POST(req: Request) {
  const { stripeConnectId, amount } = await req.json();
  const amountInCents = Number((amount * 100).toFixed(0));
  try {
    const balance = await stripe.balance.retrieve({ stripeAccount: stripeConnectId });

    const payout = await stripe.payouts.create(
      {
        amount: amountInCents,
        currency: 'usd'
      },
      {
        stripeAccount: stripeConnectId
      }
    );
    console.log(payout);
    return NextResponse.json(payout);
  } catch (err: any) {
    return NextResponse.json({
      message: err || 'Something Went Wrong'
    });
  }
}
