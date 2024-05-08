import React from 'react';

const PayoutsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container py-10 flex flex-col md:flex-row gap-5 h-screen">{children}</main>
  );
};

export default PayoutsLayout;
