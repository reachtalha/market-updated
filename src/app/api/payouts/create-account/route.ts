import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(
  'sk_test_51IxrvoH0toQxYCC9kJtPm4ecd86lkuPzKqVqrpGx6j0HQLT1GZSWIABH1RngDpOWDyPQxE3x1xlbuVAynTF4kmJo00cv9maPAy',
  {
    apiVersion: '2022-11-15'
  }
);

export async function POST(req: Request) {
  const { userId, stripeAccountId, email, firstName, lastName, phone } = await req.json();
  try {
    let account;
    if (!stripeAccountId) {
      account = await stripe.accounts.create({
        // country: "US",
        email,
        type: "express",
        capabilities: {
          transfers: {
            requested: true,
          },
        },
        settings: {
          payouts: {
            schedule: {
              interval: "manual",
            },
          },
        },
        individual: {
          email,
          phone,
          first_name: firstName,
          last_name: lastName
        },
        business_type: "individual",
        business_profile: {
          url: "",
        },
      });
    }


    const accountLink = await stripe.accountLinks.create({
      account: account?.id || stripeAccountId,
      refresh_url:
        "http://localhost:3000/seller/dashboard/payouts?redirected_from=stripe_connect_onboarding",
      return_url:
        "http://localhost:3000/seller/dashboard/payouts?redirected_from=stripe_connect_onboarding",
      type: "account_onboarding",
    });

    return NextResponse.json({
      payload: { status: true, accountLink: accountLink?.url }
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err?.message || "Something went wrong with creating account!" });
  }
}
