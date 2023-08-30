'use client';

import React from 'react';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import Index from '@/components/common/Buyer/Account/index';
import Loader from '@/components/common/Loader';

const options = [
  {
    name: 'Profile Settings',
    slug: 'settings',
    href: '/account?display'
  },
  {
    name: 'Wish List',
    slug: 'wishlist',
    href: '/account?display'
  },
  {
    name: 'Order History',
    slug: 'order',
    href: '/account?display'
  },
];

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  if (!auth.currentUser) {
    router.replace('/auth/login');
    return (
      <Loader className="grid place-content-center h-screen w-full bg-white overflow-hidden" />
    );
  }
  return <Index options={options} />;
};

export default Page;
