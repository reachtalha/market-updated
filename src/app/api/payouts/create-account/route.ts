import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});
export async function POST(req: Request) {
  try {
    const { uid, email, firstName, lastName } = await req.json();

    if (!uid || !email || !firstName || !lastName) {
      return NextResponse.json(
        {
          error: 'MISSING_PARAMETERS',
          message: "All parameters ('uid', 'email', 'firstName', 'lastName') are required."
        },
        { status: 400 }
      );
    }

    let account = await stripe.accounts.create({
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

    await setDoc(
      doc(db, 'users', `${uid}`),
      {
        stripeConnectId: account?.id
      },
      { merge: true }
    );

    const accountLink = await stripe.accountLinks.create({
      account: account?.id,
      refresh_url: `${process.env.DOMAIN}/en/seller/dashboard`,
      return_url: `${process.env.DOMAIN}/en/seller/dashboard`,
      type: 'account_onboarding'
    });

    const stripeURL = new URL(accountLink?.url);
    return NextResponse.json(stripeURL);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'An unexpected error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}
