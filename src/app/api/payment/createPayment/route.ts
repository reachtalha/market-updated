import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

export async function POST(req: Request) {
  const { price, cartDetails } = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
    apiVersion: '2022-11-15'
  });

  console.log('CART DETAILS', cartDetails);

  const transferGroup = Date.now().toString();

  function groupBy(array: any, key: any) {
    return array.reduce((result: any, currentValue: any) => {
      const keyValue = currentValue[key];
      (result[keyValue] = result[keyValue] || []).push(currentValue);
      return result;
    }, {});
  }
  const result = groupBy(cartDetails.items, 'shopId');

  console.log(result);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: Number((price * 100).toFixed(0)),
      currency: 'usd',
      transfer_group: transferGroup
    });

    for (const item of cartDetails.items) {
      const { shopId, stripeId } = item;

      const transfer = await stripe.transfers.create({
        amount: price * 100,
        currency: 'usd',
        destination: stripeId,
        transfer_group: transferGroup
      });
    }

    return NextResponse.json({
      payload: { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret }
    });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Something went wrong!' });
  }
}
