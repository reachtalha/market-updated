import React from 'react';
import Header from '@/components/common/Buyer/Layout/Header';
import Footer from '@/components/common/Buyer/Layout/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="w-full fixed top-0 z-50">
        <Header />
      </header>

      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
