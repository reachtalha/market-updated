"use client"
import { ReactNode } from 'react';
import MobileNavbar from '@/components/common/Seller/Navbar/MobileNavbar';
import useGlobalStore from '@/state';

export default function SellerLayout({ children }: { children: ReactNode }){
  const { showSidebar } = useGlobalStore() as any;

  return (
    <section
      className={`bg-neutral-50  transition-all  duration-1000 overflow-scroll no-scrollbar   text-neutral-900  flex-1 sm:rounded-xl  ${
        showSidebar && 'tilted-div rounded-xl'
      }`}
    >
      <MobileNavbar />
      {children}
    </section>
  )
}