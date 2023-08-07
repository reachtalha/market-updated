'use client';

import Link from 'next/link';

import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';

import Google from '@/assets/icons/social/Google';
import Facebook from '@/assets/icons/social/Facebook';

import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async ({ logmeout, email, password }) => {
    if (logmeout) {
      sessionBasedSignin(email, password);
    } else {
      signIn(email, password);
    }
  };
  return (
    <>
      <div className="w-full md:w-96 p-5 h-fit border-0 md:border-2 rounded-xl focus-within:border-neutral-800">
        <header>
          <div className="w-fit mx-auto py-2 font-medium font-alpina text-4xl text-primary italic">
            All Organics <span className="text-xs align-bottom">&reg;</span>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 my-4">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              className="w-full placeholder:text-sm"
              placeholder="Your email"
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">Hmm… that email doesn&apos;t look valid</span>
            )}
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              className="w-full placeholder:text-sm"
              placeholder="Your password"
              {...register('password', {
                required: true
              })}
            />
            {errors.password && <span className="text-sm text-red-500">Incorrect password</span>}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <input type="checkbox" className="mr-1 accent-neutral-800" id="logmeout" />
              <label htmlFor="logmeout" className="text-sm 2xl:text-base">
                Log Me Out
              </label>
            </div>
            <Link href="/auth/reset-password" className="hover:underline text-sm 2xl:text-base">
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={loading}
            variant="default"
            className="w-full"
          >
            Login
          </Button>
        </form>
        <p className="my-2 text-primary text-center">
          <b>OR</b>
        </p>
        <div className="flex justify-center gap-x-3">
          <Button type="button"
            disabled={loading}
            onClick={signInWithGoogleAccount} className="w-36 h-fit gap-x-2.5 group flex items-center cursor-pointer p-1 rounded-full bg-gray-100  hover:bg-primary transition-colors duration-300">
            <span
              className="bg-gray-200  rounded-full border p-2"
            >
              <Google className="w-5 2xl:w-8 h-5 2xl:h-8" fill={'#414D35'} />
            </span>
            <span className="mr-auto text-primary group-hover:text-white">Google</span>
          </Button>
          <Button type="button"
            disabled={loading}
            onClick={signInWithFacebookAccount}
            className="w-36 h-fit group flex items-center cursor-pointer gap-x-2.5 p-1 rounded-full bg-gray-100  hover:bg-primary transition-colors duration-300"            >
            <span
              className=" bg-gray-200  rounded-full border p-2"
            >
              <Facebook className="w-5 2xl:w-8 h-5 2xl:h-8 " fill={'#414D35'} />
            </span>
            <span className="mr-auto text-primary group-hover:text-white">Facebook</span>
          </Button>
        </div>
        <p className="text-center mt-3">
          Not a member yet?{' '}
          <Link href="/auth/register" className="font-semibold underline">
            Register now
          </Link>
        </p>
      </div>
    </>
  );
};
export default Login;
