import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') as string;

  if (!id) {
    return NextResponse.json(
      {
        error: 'MISSING_PARAMETER',
        message: "The 'id' parameter is missing from the request query."
      },
      { status: 400 }
    );
  }

  try {
    const balance = await stripe.balance.retrieve({ stripeAccount: id });
    const currentBalance = Number(balance.available[0].amount) / 100;
    return NextResponse.json(currentBalance);
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

export async function POST(req: Request) {
  try {
    const { stripeConnectId, amount } = await req.json();

    if (!stripeConnectId || !amount) {
      return NextResponse.json(
        {
          error: 'MISSING_PARAMETERS',
          message: "Both 'stripeConnectId' and 'amount' parameters are required."
        },
        { status: 400 }
      );
    }

    const amountInCents = Number((amount * 100).toFixed(0));

    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        {
          error: 'INVALID_AMOUNT',
          message: "'amount' must be a positive number."
        },
        { status: 400 }
      );
    }

    const payout = await stripe.payouts.create(
      {
        amount: amountInCents,
        currency: 'usd'
      },
      {
        stripeAccount: stripeConnectId
      }
    );

    return NextResponse.json(payout);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'An unexpected error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}
