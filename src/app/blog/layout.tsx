'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Buyer/Layout/Header';
import { useRole } from '@/hooks/useUserRole';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const role = useRole();

  if (role && role !== 'influencer') {
    notFound();
  }
  return (
    <>
      <header className="w-full fixed top-0 z-50">
        <Header />
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
