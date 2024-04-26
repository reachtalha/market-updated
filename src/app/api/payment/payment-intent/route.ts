import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

export async function POST(req: Request) {
  try {
    const { price } = await req.json();

    if (!price || isNaN(price) || price <= 0) {
      return NextResponse.json(
        {
          error: 'INVALID_PRICE',
          message: "'price' must be a positive number."
        },
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2022-11-15' });
    const transferGroup = 'trg-' + Date.now().toString();

    const totalAmount = Number((price * 100).toFixed(0));
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: totalAmount,
      currency: 'usd',
      transfer_group: transferGroup
    });

    return NextResponse.json({
      payload: {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        transferGroup: transferGroup
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'An unexpected error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}
