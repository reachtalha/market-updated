'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const handleResetPassword = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract email from form data
    const form = new FormData(event.target);
    const { email } = Object.fromEntries(form.entries());

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if (!emailRegex.test(email.toString())) {
      toast.error("Your email doesn't look valid!");
      return;
    }

    try {
      setLoading(true);

      // Send password reset email
      await sendPasswordResetEmail(auth, email.toString());
      setIsEmailSent(true);
      // Display success toast
      toast.success('Password reset link sent to your email');

      // Reset form
      event.target.reset();
    } catch (error: any) {
      // Handle specific error cases
      if (error === 'auth/user-not-found') {
        setIsEmailSent(false);
        toast.error("The email you entered isn't connected to an account.");
      } else {
        toast.error('Your request cannot be processed at this time.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-96 p-5 h-fit border-0 md:border-2 rounded-xl focus-within:border-neutral-800">
      {isEmailSent ? (
        <>
          <h3 className="font-semibold text-xl 2xl:text-2xl">Request Sent to your Email</h3>
          <p className="text-[13px] mt-1 text-gray-600 2xl:text-base">
            Please check your email for a password reset link and follow the instructions to
            successfully reset your password
          </p>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-xl 2xl:text-2xl">Reset Password</h3>
          <p className="text-[13px] mt-1 text-gray-600 2xl:text-base">
            Please enter the email associated with your account. We will send you an email with
            instructions to reset your password.
          </p>
        </>
      )}
      <form onSubmit={handleResetPassword} className="space-y-4 my-3">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            aria-label="email"
            className="w-full placeholder:text-sm"
            placeholder="Your email"
          />
        </div>
        <Button type="submit" variant="default" disabled={loading} className="w-full">
          {loading ? 'Please wait' : 'Reset Password'}
        </Button>
      </form>
      <p className="text-center mt-3">
        Remember the Password?{' '}
        <Link href="/auth/login" className="font-semibold underline">
          Login
        </Link>
      </p>
    </div>
  );
};
export default ResetPassword;
