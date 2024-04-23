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

    if (!transferGroup || !cartDetails || !cartDetails.items || cartDetails.items.length === 0) {
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
      result.map(async ({ key, totalAmount }) => {
        try {
          await stripe.transfers.create({
            amount: Number((totalAmount * 100).toFixed(0)),
            currency: 'usd',
            destination: key,
            transfer_group: transferGroup
          });
        } catch (transferError) {
          throw transferError;
        }
      })
    );

    return NextResponse.json(
      {
        error: 'SUCCESS',
        message: 'Charge Transfer created succesfully'
      },
      { status: 200 }
    );
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
