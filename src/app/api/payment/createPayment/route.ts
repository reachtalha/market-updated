import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

interface CartItem {
  itemId: string;
  docId: string;
  selectedVariant?: { key: string; price: number };
  image: string;
  name: string;
  shopId: string;
  unit: string;
  stripeConnectId: string;
  quantity: number;
}

// Function to group items by a given key
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, currentValue: T) => {
    const keyValue = String(currentValue[key]);
    (result[keyValue] ||= []).push(currentValue);
    return result;
  }, {});
}

// Main function handling the POST request
export async function POST(req: Request) {
  try {
    // Parse request body
    const { price, cartDetails } = await req.json();

    // Create Stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2022-11-15' });

    // Generate transfer group ID
    const transferGroup = Date.now().toString();

    // Group items by stripeConnectId and calculate total amount for each stripeConnectId
    const result: { key: string; totalAmount: number }[] = [];
    for (const [accountId, accountItems] of Object.entries(
      groupBy(cartDetails.items, 'stripeConnectId')
    )) {
      const totalAmount = accountItems.reduce((sum, item: any) => {
        if (item.selectedVariant && item.quantity !== undefined) {
          // Check if selectedVariant and quantity exist
          const { price } = item.selectedVariant;
          return sum + price * item.quantity;
        }
        return sum;
      }, 0);
      result.push({ key: accountId, totalAmount });
    }

    // Create payment intent
    const totalAmount = Number((price * 100).toFixed(0));
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: totalAmount,
      currency: 'usd',
      transfer_group: transferGroup
    });

    // Make transfers for each stripeConnectId
    await Promise.all(
      result.map(({ key, totalAmount }) =>
        stripe.transfers.create({
          amount: Number((totalAmount * 100).toFixed(0)),
          currency: 'usd',
          destination: key,
          transfer_group: transferGroup
        })
      )
    );

    return NextResponse.json({
      payload: { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret }
    });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' });
  }
}
