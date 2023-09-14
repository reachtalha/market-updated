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

const Register = ({ dictionary }: { dictionary?: any }) => {
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
        <h3 className="font-semibold text-xl">{dictionary.auth.register.heading}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 my-3">
          <div className="space-y-1">
            <Label>{dictionary.auth.register.name.label}</Label>
            <Input
              type="text"
              className="w-full placeholder:text-sm"
              placeholder={dictionary.auth.register.name.placeholder}
              {...register('name', {
                required: true
              })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{dictionary.auth.register.name.error}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label>{dictionary.auth.common.email.label}</Label>
            <Input
              type="email"
              className="w-full placeholder:text-sm"
              placeholder={dictionary.auth.common.email.placeholder}
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{dictionary.auth.common.email.error}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label>{dictionary.auth.common.password.label}</Label>
            <Input
              type="password"
              className="w-full placeholder:text-sm"
              placeholder={dictionary.auth.common.password.placeholder}
              {...register('password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,256}$/i
              })}
            />
            {errors.password && (
              <ul className=" text-sm text-red-500">
                {errors.password.type === 'required' && (
                  <li>{dictionary.auth.password.required}</li>
                )}
                {errors.password.type === 'minLength' && <li>{dictionary.auth.password.min}</li>}
                {errors.password.type === 'maxLength' && <li>{dictionary.auth.password.max}</li>}
                {errors.password.type === 'pattern' && <li>{dictionary.auth.password.pattern}</li>}
              </ul>
            )}
          </div>
          <p className="font-medium text-sm text-gray-600 mb-2">
            {dictionary.auth.register.accountTerms}
          </p>
          <Button type="submit" disabled={loading} variant="default" className="w-full ">
            {loading
              ? dictionary.auth.register.registerBtnLoadingLabel
              : dictionary.auth.register.registerBtnLabel}
          </Button>
        </form>
        <p className="my-2 text-primary text-center">
          <b>{dictionary.auth.common.orLbel}</b>
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
            <span className="mr-auto text-primary group-hover:text-white">
              {dictionary.auth.common.socialAuthGoogleLabel}
            </span>
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
            <span className="mr-auto text-primary group-hover:text-white">
              {dictionary.auth.common.socialAuthFacebookLabel}
            </span>
          </Button>
        </div>
        <p className="text-center mt-3">
          {dictionary.auth.register.yesMember}{' '}
          <Link href="/auth/login" className="font-semibold underline">
            {dictionary.auth.register.loginLabel}
          </Link>
        </p>
        <p className="text-center mt-3">
          {dictionary.auth.register.joinAsLabel}{' '}
          <Link href="/new-registration" className="font-semibold underline">
            {dictionary.auth.register.joinAsRolesLabel}
          </Link>{' '}
          ?
        </p>
      </div>
    </>
  );
};
export default Register;
