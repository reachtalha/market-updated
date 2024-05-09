import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase/client';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: '🌿 Subscription Successful - Welcome to All-Organics! 🎉',
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Subscription Successful - Welcome to All-Organics!</title>
      </head>
      <body style="background-color: #ffffff; margin: 0; font-family: sans-serif;">
        <div style="margin: auto; max-width: 465px; padding: 5px; margin-top: 10px; margin-bottom: 10px;">
          <h2 style="font-size: 1.25rem; font-weight: normal; text-align: center; padding: 0; margin-top: 8px; margin-bottom: 8px;">
            🌿 Subscription Successful - Welcome to All-Organics! 🎉
          </h2>
          <p style="font-size: 0.875rem;">Hello</p>
          <p style="font-size: 0.875rem;">
            Thank you for subscribing to All-Organics! 🌱 You're now part of our eco-conscious community. Get ready to explore our organic products and receive exclusive offers!
          </p>
          <div style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
            <p style="font-size: 0.875rem;">
              If you have any questions or need assistance, feel free to contact us at ${
                process.env.SUPPORT_EMAIL || 'customer-support@allorganics.com'
              }.
            </p>
          </div>
          <p style="font-size: 0.875rem;">
            Best Regards,
            <br />
            All-Organics Team
          </p>
        </div>
      </body>
      </html>
      `
    };

    await setDoc(doc(db, 'subscribers', email), {
      email,
      createdAt: Timestamp.fromDate(new Date())
    });
    await transporter.sendMail(options);
    return NextResponse.json({ message: 'Email Sent' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
