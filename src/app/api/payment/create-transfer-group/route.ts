import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, currentValue: T) => {
    const keyValue = String(currentValue[key]);
    (result[keyValue] ||= []).push(currentValue);
    return result;
  }, {});
}

export async function POST(req: Request) {
  try {
    const { transferGroup, cartDetails } = await req.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2022-11-15' });

    const result: { key: string; totalAmount: number }[] = [];

    for (const [accountId, accountItems] of Object.entries(
      groupBy(cartDetails.items, 'stripeConnectId')
    )) {
      const totalAmount = accountItems.reduce((sum, item: any) => {
        if (item.selectedVariant && item.quantity !== undefined) {
          const { price } = item.selectedVariant;
          return sum + price * item.quantity;
        }
        return sum;
      }, 0);
      result.push({ key: accountId, totalAmount });
    }

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
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' });
  }
}
