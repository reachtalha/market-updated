'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import { useSearchParams, useRouter } from 'next/navigation';

import { db, auth } from '@/lib/firebase/client';
import { doc, getDoc } from '@firebase/firestore';

import OnBoardingForm from '@/components/modules/OnBoarding';
import Loader from '@/components/common/Loader';

export const metadata: Metadata = {
  title: 'OnBoarding',
  description:
    'This page provides information and guidance for new users to get started with our platform.'
};

const OnBoarding = () => {
  const search = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const uid = search?.get('id');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!uid || uid !== auth.currentUser?.uid) {
          router.push('/');
        }
        const docRef = await getDoc(doc(db, 'users', `${uid}`));
        if (docRef.exists()) {
          if (docRef.data().role === 'buyer') router.push('/');
          else router.push('/dashboard');
        }
      } catch (e: any) {
        router.push('/500');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Loader className="grid place-content-center bg-white overflow-hidden h-screen w-full" />
    );
  }

  return (
    <>
      <section className="relative space-y-3 md:shadow-lg lg:w-[500px] max-w-[550px] rounded-xl border-0 md:border-2 md:p-5 px-3 py-4">
        <OnBoardingForm />
      </section>
    </>
  );
};

export default OnBoarding;
