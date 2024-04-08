import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function POST(req: Request) {
  const { userId, stripeAccountId, email, firstName, lastName, phone, amount } = await req.json();

  try {
    let account;
    console.log('BODY', { userId, stripeAccountId, email, firstName, lastName, phone, amount });
    const balance = await stripe.balance.retrieve();
    console.log('BALANCE', balance);

    if (!stripeAccountId) {
      account = await stripe.accounts.create({
        // country: 'US',
        email,
        type: 'express',
        capabilities: {
          transfers: {
            requested: true
          }
        },
        settings: {
          payouts: {
            schedule: {
              interval: 'manual'
            }
          }
        },
        individual: {
          email,
          first_name: firstName,
          last_name: lastName
        },
        business_type: 'individual',
        business_profile: {
          url: ''
        }
      });

      console.log(`New Stripe Account ID: ${account.id}`);
    } else {
      const payout = await stripe.payouts.create(
        {
          amount: amount,
          currency: 'usd',
          source_type: 'card'
        },
        {
          stripeAccount: stripeAccountId
        }
      );
      console.log(payout);
      console.log(`Payout created: ${payout.id}`);
      return NextResponse.json({
        message: `Payout of ${amount} created for account ${stripeAccountId}`
      });
    }

    const accountLink = await stripe.accountLinks.create({
      account: account?.id || stripeAccountId,
      refresh_url:
        'http://localhost:3000/en/seller/payouts?redirected_from=stripe_connect_onboarding',
      return_url:
        'http://localhost:3000/en/seller/payouts?redirected_from=stripe_connect_onboarding',
      type: 'account_onboarding'
    });

    console.log(accountLink);
    const stripeURL = new URL(accountLink?.url);
    console.log(stripeURL);
    return NextResponse.json(stripeURL);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      message: err?.message || 'Something went wrong!'
    });
  }
}
