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
    if (!transferGroup || !cartDetails) {
      return NextResponse.json(
        {
          error: 'INVALID_REQUEST',
          message: "Invalid request. 'transferGroup' and 'cartDetails' with items are required."
        },
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2022-11-15' });

    const result: { key: string; totalAmount: number }[] = [];

    for (const [accountId, accountItems] of Object.entries(
      groupBy(cartDetails, 'stripeConnectId')
    )) {
      const totalAmount = accountItems.reduce((sum, item: any) => {
        if (item.selectedVariant && item.selectedVariant.quantity !== undefined) {
          const { price } = item.selectedVariant;
          return sum + price * item.quantity;
        }
        return sum;
      }, 0);
      result.push({ key: accountId, totalAmount });
    }
    for (let i = 0; i < result.length; i++) {
      await stripe.transfers.create({
        amount: Number((result[i].totalAmount * 100).toFixed(0)),
        currency: 'usd',
        destination: result[i].key,
        transfer_group: transferGroup
      });
    }

    return NextResponse.json(
      {
        error: 'SUCCESS',
        message: 'Charge Transfer created succesfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'An unexpected error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}
