'use client';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import MobileNavbar from '@/components/common/Seller/Navbar/MobileNavbar';
import useGlobalStore from '@/state';
import Loader from '@/components/common/Loader';

export default function SellerLayout({ data, children }: { data: any; children: ReactNode }) {
  const { showSidebar } = useGlobalStore() as any;
  const userData = JSON.parse(data);
  const router = useRouter();

  if (!userData) {
    router.push('/onboarding');
    return (
      <div className="z-50 fixed inset-0 w-screen bg-white h-screen overflow-hidden grid place-content-center">
        <Loader />
      </div>
    );
  }
  if (!userData?.stripeConnectId) {
    router.push('/connect-with-stripe');
    return (
      <div className="z-50 fixed inset-0 w-screen bg-white h-screen overflow-hidden grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <section
      className={`bg-neutral-50  transition-all  duration-1000 overflow-scroll no-scrollbar text-neutral-900  flex-1 sm:rounded-xl  ${
        showSidebar && 'tilted-div rounded-xl'
      }`}
    >
      <MobileNavbar />
      {children}
    </section>
  );
}
