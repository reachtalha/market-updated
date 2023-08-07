import { NextResponse } from 'next/server';
import { Stripe} from 'stripe';

export async function GET(req: Request) {
  const stripe = new Stripe('sk_test_51IxrvoH0toQxYCC9kJtPm4ecd86lkuPzKqVqrpGx6j0HQLT1GZSWIABH1RngDpOWDyPQxE3x1xlbuVAynTF4kmJo00cv9maPAy', {
    apiVersion: "2022-11-15"
  });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: 23 * 100,
      currency: "usd"
    })

    return NextResponse.json({ payload: { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret }});
  }catch(err){
    console.log({ err });
    return NextResponse.json({ message: `test` });
  }
}
