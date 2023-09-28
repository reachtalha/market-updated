'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Buyer/Layout/Header';
import { useRole } from '@/hooks/useUserRole';

const Layout = ({ children, dictionary }: { children: React.ReactNode; dictionary: any }) => {
  const role = useRole();

  if (role && role !== 'influencer') {
    notFound();
  }
  return (
    <>
      <header className="w-full fixed top-0 z-50">
        <Header dictionary={dictionary} />
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
