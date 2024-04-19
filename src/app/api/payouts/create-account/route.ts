import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2022-11-15'
});

export async function POST(req: Request) {
  const { uid, email, firstName, lastName } = await req.json();

  try {
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

    const res = await setDoc(
      doc(db, 'users', `${uid}`),
      {
        stripeAccountId: account?.id
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
    return NextResponse.json({
      message: err?.message || 'Something went wrong!'
    });
  }
}
