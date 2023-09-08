'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { CancelTokenSource } from 'axios';

import useAuth from '@/hooks/useAuth';

import Google from '@/assets/icons/social/Google';
import Facebook from '@/assets/icons/social/Facebook';

import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface RegisterForm {
  email: string;
  password: string;
  name: string;
}

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signInWithGoogleAccount, signInWithFacebookAccount } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>();

  let cancelTokenSource: CancelTokenSource | undefined;

  const onSubmit: SubmitHandler<RegisterForm> = async ({ name, email, password }) => {
    try {
      setLoading(true);

      // Cancel any previous request before making a new one
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Request canceled');
      }

      // Create a new cancel token source
      cancelTokenSource = axios.CancelToken.source();

      await axios.post(
        '/api/auth/register',
        {
          name,
          email,
          password,
          role: 'buyer'
        },
        {
          cancelToken: cancelTokenSource.token
        }
      );

      toast.success('Registration successful! Your account has been created.');
      router.push('/auth/login');
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        toast.error(`Error!: ${error.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full md:w-96 p-5 h-fit border-0 md:border-2 rounded-xl focus-within:border-neutral-800">
        <h3 className="font-semibold text-xl">Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 my-3">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              type="text"
              className="w-full placeholder:text-sm"
              placeholder="Your name"
              {...register('name', {
                required: true
              })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">Your name doesn&apos;t look valid</span>
            )}
          </div>
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
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,256}$/i
              })}
            />
            {errors.password && (
              <ul className=" text-sm text-red-500">
                {errors.password.type === 'required' && <li>This field is required</li>}
                {errors.password.type === 'minLength' && (
                  <li>Password must be at least 8 characters long</li>
                )}
                {errors.password.type === 'maxLength' && (
                  <li>Password cannot exceed 256 characters</li>
                )}
                {errors.password.type === 'pattern' && (
                  <li>
                    Password must contain at least one uppercase letter, one lowercase letter, and
                    one digit
                  </li>
                )}
              </ul>
            )}
          </div>
          <p className="font-medium text-sm text-gray-600 mb-2">
            By creating an account, you agree to the Terms of Service.
          </p>
          <Button type="submit" disabled={loading} variant="default" className="w-full ">
            {loading ? 'Registering your account' : 'Register'}
          </Button>
        </form>
        <p className="my-2 text-primary text-center">
          <b>OR</b>
        </p>
        <div className="flex justify-center gap-x-3">
          <Button
            type="button"
            disabled={loading}
            onClick={signInWithGoogleAccount}
            className="w-36 h-fit gap-x-2.5 group flex items-center cursor-pointer p-1 rounded-full bg-gray-100  hover:bg-primary transition-colors duration-300"
          >
            <span className="bg-gray-200  rounded-full border p-2">
              <Google className="w-5 2xl:w-8 h-5 2xl:h-8" fill={'#414D35'} />
            </span>
            <span className="mr-auto text-primary group-hover:text-white">Google</span>
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={signInWithFacebookAccount}
            className="w-36 h-fit group flex items-center cursor-pointer gap-x-2.5 p-1 rounded-full bg-gray-100  hover:bg-primary transition-colors duration-300"
          >
            <span className=" bg-gray-200  rounded-full border p-2">
              <Facebook className="w-5 2xl:w-8 h-5 2xl:h-8 " fill={'#414D35'} />
            </span>
            <span className="mr-auto text-primary group-hover:text-white">Facebook</span>
          </Button>
        </div>
        <p className="text-center mt-3">
          Already a Member?{' '}
          <Link href="/auth/login" className="font-semibold underline">
            Login
          </Link>
        </p>
        <p className="text-center mt-3">
          Want to Join as{' '}
          <Link href="/new-registration" className="font-semibold underline">
            Seller/Expert
          </Link>{' '}
          ?
        </p>
      </div>
    </>
  );
};
export default Register;
