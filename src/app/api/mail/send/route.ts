import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { WaitingListProps } from '@/components/common/Templates/Email';
import { WaitingList } from '@/components/common/Templates/Email';
import { render } from '@react-email/render';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465, // Use 465 for SSL
  secure: true, // Use SSL
  auth: {
    user: 'email', // Your Zoho Mail email address
    pass: 'password' // Your Zoho Mail password
  }
});

export async function POST(req: Request) {
  const { name, password, email } = await req.json();
  try {
    const options = {
      from: 'dev7@ccript.com',
      to: email,
      subject: 'Account Approved',
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>Welcome to Organic living!</title>
    </head>
    <body style="background-color: #ffffff; margin: 0; font-family: sans-serif;">
      <div style="margin: auto; max-width: 465px; padding: 5px; margin-top: 10px; margin-bottom: 10px;">
        <h2 style="font-size: 1.25rem; font-weight: normal; text-align: center; padding: 0; margin-top: 8px; margin-bottom: 8px;">
          Welcome to Organic living!
        </h2>
        <p style="font-size: 0.875rem;">Hello ${name},</p>
        <p style="font-size: 0.875rem;">
          Thank you for joining our Team as an Expert. We are excited to have you on board and will keep you
          updated on our latest updates and release date.
        </p>
        <div style="text-align: left; margin-top: 32px; margin-bottom: 32px;">
          <p style="font-size: 0.875rem;">Here are your login credentials:</p>
          <p style="font-size: 0.875rem;">Email: ${email}</p>
          <p style="font-size: 0.875rem;">Password: ${password}</p>
          <p style="font-size: 0.875rem;">Use this link to login : http://localhost:3000/auth/login </p>
        </div>
        <div style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
          <p style="font-size: 0.875rem;">
            If you have any questions or need further assistance, feel free to reach out to our
            support team.
          </p>
        </div>
        <p style="font-size: 0.875rem;">
          Best Regards,
          <br />
          All Organics Team
        </p>
      </div>
    </body>
    </html>
  `
    };

    await transporter.sendMail(options);
    return NextResponse.json({ message: 'Email Sent' }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
