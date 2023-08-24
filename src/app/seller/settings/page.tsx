'use client';
import React from 'react';
import Index from '@/components/modules/Account/Settings/index';
import { auth, db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

type Props = {};

const getUser = async () => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const userRef = await getDoc(doc(db, 'users', userId));
    if (userRef.exists()) {
      return userRef.data();
    }
  }
};

const Page = (props: Props) => {
  const { data: user, error, isLoading } = useSwr('seller-settings', getUser);
  if (isLoading) return <Loader className="flex items-center justify-center w-full h-80" />;
  if (error) return <Error />;
  return (
    <div className="w-[90%] sm:wd-[80%] md:w-[65%] lg:w-[45%] 2xl:w-[60%] m-auto mt-10 ">
      <Index
        defaultValues={{
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          address: user?.address,
          newPassword: '',
          currentPassword: '',
          confirmPassword: ''
        }}
      />
    </div>
  );
};

export default Page;
