"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
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

      // Display success toast
      toast.success("Password reset link sent to your email");

      // Reset form
      event.target.reset();
    } catch (error: any) {
      // Handle specific error cases
      if (error === "auth/user-not-found") {
        toast.error("The email you entered isn't connected to an account.");
      } else {
        toast.error("Your request cannot be processed at this time.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-96 p-5 h-fit border-0 md:border-2 rounded-xl focus-within:border-neutral-800">
      <h3 className="font-semibold text-xl 2xl:text-2xl">Reset Password</h3>
      <p className="text-[13px] mt-1 text-gray-600 2xl:text-base">
        Please enter the email associated with your account. We will send you an
        email with instructions to reset your password.
      </p>
      <form onSubmit={handleResetPassword} className="space-y-4 my-3">
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            aria-label="email"
            className="w-full rounded-xl border-[2px] border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700"
            placeholder="Your email"
          />
        </div>
        <button
          type="submit"
          disabled={loading ? true : false}
          className="disabled:cursor-not-allowed w-full border bg-neutral-800 hover:bg-neutral-900 duration-300 transition-colors focus: outline text-white rounded py-2 m-0"
        >
          {loading ? "Please wait" : "Reset Password"}
        </button>
      </form>
      <p className="text-center mt-3">
        Remember the Password?{" "}
        <Link href="/auth/login" className="font-semibold underline">
          Login
        </Link>
      </p>
    </div>
  );
};
export default ResetPassword;
