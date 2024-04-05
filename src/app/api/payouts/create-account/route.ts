import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { redirect } from 'next/navigation';
const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export const config = {
  api: {
    bodyParser: false
  }
};
export async function POST(req: Request) {
  const { userId, stripeAccountId, email, firstName, lastName, phone } = await req.json();
  try {
    let account;
    if (!stripeAccountId) {
      account = await stripe.accounts.create({
        // country: "US",
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
    }
    const accountLink = await stripe.accountLinks.create({
      account: account?.id || stripeAccountId,
      refresh_url:
        'http://localhost:3000/en/seller/payouts?redirected_from=stripe_connect_onboarding',
      return_url:
        'http://localhost:3000/en/seller/payouts?redirected_from=stripe_connect_onboarding',
      type: 'account_onboarding'
    });

    const stripeURL = new URL(accountLink?.url);

    // return NextResponse.redirect(new URL(accountLink?.url));
    return NextResponse.json(stripeURL);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      message: err?.message || 'Something went wrong with creating account!'
    });
  }
}
