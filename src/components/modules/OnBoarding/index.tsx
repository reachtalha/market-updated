'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import { db, auth } from '@/lib/firebase/client';
import { doc, setDoc, Timestamp } from '@firebase/firestore';
import { updateProfile } from 'firebase/auth';

import toast from 'react-hot-toast';

import { useRole } from '@/hooks/useUserRole';

import { Button } from '@/components/ui/button';

import BasicDetails from '@/components/modules/OnBoarding/BasicDetails';
import Categories from '@/components/modules/OnBoarding/Categories';
import Influencer from '@/components/modules/OnBoarding/Influencer';
import UploadImage from '@/utils/handlers/image/UploadImage';
import SellerPaymentInfo from '@/components/modules/OnBoarding/SellerPaymentInfo';
import useLocale from '@/hooks/useLocale';

type FormValues = {
  countryCode: string;
  phone: string;
  zipcode: number;
  country: string;
  city: string;
  address: string;
  favourites?: string[];
  topics?: string[];
  socialMediaLinks?: string[];
  image?: any;
};

const OnBoardingForm = () => {
  const router = useRouter();
  const role = useRole();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormValues>();
  const locale = useLocale();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      if (role === 'influencer' && !data.topics) {
        toast.error('Please add atleast one topic');
        return;
      }
      const obj = {
        ...data,
        zipcode: Number(data.zipcode),
        country: data.country.toLowerCase(),
        city: data.city.toLowerCase(),
        address: data.address.toLowerCase(),
        name: auth.currentUser?.displayName?.toLowerCase(),
        email: auth.currentUser?.email,
        role: role,
        ...(role === 'seller' && { stripeAccountId: null }),
        createdAt: Timestamp.fromDate(new Date())
      };
      if (data.image) {
        const url = await UploadImage({
          collection: 'users',
          image: data.image,
          name: auth.currentUser?.uid
        });
        updateProfile(auth.currentUser!, {
          photoURL: url
        });
        Object.assign(obj, { photoURL: url });
      }
      delete obj.image;
      await setDoc(doc(db, 'users', `${auth.currentUser?.uid}`), obj);
      if (role === 'buyer') router.push(`/${locale}`);
      else router.push(`/${locale}/seller/dashboard`);
    } catch (error: any) {
      toast.error(`Error! ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = (label: string) => (
    <Button type="submit" disabled={loading} className="mt-3 w-full">
      {loading ? 'Please wait...' : label}
    </Button>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <BasicDetails setStep={setStep} role={role} />
          </>
        )}
        {step === 2 && role === 'seller' && (
          <>
            <SellerPaymentInfo />
            {role === 'seller' && renderButton('Finish')}
          </>
        )}
        {step === 2 && role === 'buyer' && (
          <>
            <Categories />
            {renderButton('Finish')}
          </>
        )}
        {step === 2 && role === 'influencer' && (
          <>
            <Influencer />
            {renderButton('Finish')}
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default OnBoardingForm;
