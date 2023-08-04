'use client';
import React, { useEffect } from 'react';
import Sidebar from '@/components/common/Seller/Sidebar';
import MobileNavbar from '@/components/common/Seller/Navbar/MobileNavbar';
import useGlobalStore from '@/state';
import { useRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { showSidebar } = useGlobalStore() as any;
  const role = useRole();
  const router = useRouter();

  useEffect(() => {
    console.log('here', role);
    if (role === 'loading') {
      return;
    }
    if (role !== 'seller') {
      router.push('/auth/register');
    }
  }, [role, router]);

  return (
    <div className={`bg-neutral-900 flex  h-screen overflow-hidden  sm:p-1.5 sm:gap-1.5 `}>
      <aside>
        <Sidebar />
      </aside>
      <section
        className={`bg-neutral-50  transition-all  duration-1000 overflow-scroll no-scrollbar   text-neutral-900  flex-1 sm:rounded-xl  ${
          showSidebar && 'tilted-div rounded-xl'
        }`}
      >
        <MobileNavbar />

        {children}
      </section>
    </div>
  );
};

export default Layout;
