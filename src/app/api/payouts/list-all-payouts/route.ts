import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function POST(req: Request) {
  try {
    const { stripeConnectId } = await req.json();

    if (!stripeConnectId) {
      return NextResponse.json(
        {
          error: 'MISSING_PARAMETER',
          message: "'stripeConnectId' parameter is required."
        },
        { status: 400 }
      );
    }

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
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'An unexpected error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}
