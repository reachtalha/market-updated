'use client';
import { ReactNode, useEffect, useState } from 'react';
import MobileNavbar from '@/components/common/Seller/Navbar/MobileNavbar';
import useGlobalStore from '@/state';
import { auth } from '@/lib/firebase/client';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import useLocale from '@/hooks/useLocale';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
async function currentSellerInfo(locale: string, id: string, router: AppRouterInstance) {
  const docRef = await getDoc(doc(db, 'users', `${id}`));
  if (docRef.exists()) {
    const data = docRef.data();
    if (!data.stripeAccountId) {
      router.push(`/${locale}/connect-with-stripe`);
    } else {
      return data;
    }
  } else {
    router.push(`/${locale}/onboarding/?id=${auth.currentUser?.uid}`);
  }
}

export default function SellerLayout({ children }: { children: ReactNode }) {
  const { showSidebar } = useGlobalStore() as any;
  const locale = useLocale();
  const router = useRouter();
  const [sellerData, setSellerData] = useState<any>(null);
  const pathname = usePathname();
  useEffect(() => {
    const fetchSellerInfo = async () => {
      if (auth.currentUser) {
        const seller = await currentSellerInfo(locale, auth.currentUser.uid, router);
        if (seller) {
          setSellerData(seller);
        }
      }
    };

    fetchSellerInfo();
  }, [locale, pathname, router]);

  console.log('AUTH SELLER', sellerData);
  console.log('SELLER UID', auth?.currentUser?.uid);

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
