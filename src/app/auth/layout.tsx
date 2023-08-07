'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth } from '@/lib/firebase/client';
import Loader from '@/components/common/Loader';
import { Cross1Icon } from '@radix-ui/react-icons';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (auth.currentUser) {
    router.back();
    return <Loader className="grid place-content-center h-screen w-screen overflow-hidden" />;
  }

  return (
    <>
      <main className="grid place-content-center h-screen w-full">
        <Link className="absolute rounded-full hover:bg-gray-50 top-3 right-3 p-1.5" href="/">
          <Cross1Icon className="w-5 h-5" />
        </Link>
        {children}
      </main>
    </>
  );
};

export default Layout;
