import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function POST(req: Request) {
  const { stripeConnectId } = await req.json();
  try {
    const payouts = await stripe.payouts.list(
      {
        limit: 10
      },
      {
        stripeAccount: stripeConnectId
      }
    );
    return NextResponse.json(payouts);
  } catch (err: any) {
    return NextResponse.json({
      message: err?.message || 'Something went wrong!'
    });
  }
}
