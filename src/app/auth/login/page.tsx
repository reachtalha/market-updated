"use client";

import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

import Google from "@/assets/icons/social/Google";
import Facebook from "@/assets/icons/social/Facebook";

import toast from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
  logmeout: boolean;
}

const Login = () => {
  const {
    signIn,
    signInWithGoogleAccount,
    signInWithFacebookAccount,
    sessionBasedSignin,
    loading,
    error,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async ({
    logmeout,
    email,
    password,
  }) => {
    if (logmeout) {
      sessionBasedSignin(email, password);
    } else {
      signIn(email, password);
    }
    if (error) {
      toast.error(`Error occured! ${error}`);
    }
  };
  return (
    <>
      <div className="w-full md:w-96 p-5 h-fit border-0 md:border-2 rounded-xl focus-within:border-neutral-800">
        <header>
          <div className="w-fit mx-auto py-2 font-alpina text-xl italic">
            All Organics <span className="text-xs align-bottom">&reg;</span>
          </div>
        </header>
        <h3 className="font-semibold text-xl">Log In</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 my-4">
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border-[2px] border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700"
              placeholder="Your email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                Hmm… that email doesn&apos;t look valid
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border-[2px] border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700"
              placeholder="Your password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">Incorrect password</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                className="mr-1 accent-neutral-800"
                id="logmeout"
              />
              <label htmlFor="logmeout" className="text-sm 2xl:text-base">
                Log Me Out
              </label>
            </div>
            <Link
              href="/auth/reset-password"
              className="hover:underline text-sm 2xl:text-base"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="disabled:cursor-not-allowed w-full border bg-neutral-800 hover:bg-neutral-900 duration-300 transition-colors focus: outline text-white rounded py-2 m-0"
          >
            Login
          </button>
        </form>
        <p className="my-2 text-gray-400 text-center">
          <b>OR</b>
        </p>
        <div className="flex justify-center gap-x-3">
          <button
            type="button"
            disabled={loading}
            onClick={signInWithGoogleAccount}
            className="disabled:cursor-not-allowed bg-white hover:bg-gray-50 rounded-full border p-2"
          >
            <Google className="w-6 2xl:w-8 h-6 2xl:h-8" />
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={signInWithFacebookAccount}
            className="disabled:cursor-not-allowed bg-white hover:bg-gray-50 rounded-full border p-2"
          >
            <Facebook className="w-6 2xl:w-8 h-6 2xl:h-8" />
          </button>
        </div>
        <p className="text-center mt-3">
          Not a member yet?{" "}
          <Link href="/auth/register" className="font-semibold underline">
            Register now
          </Link>
        </p>
      </div>
    </>
  );
};
export default Login;
