import { ReactNode } from 'react';
import Sidebar from '@/components/common/Seller/Sidebar';
import SellerLayout from '@/components/common/Seller/SellerLayout';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { cookies } from 'next/headers';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from '@firebase/firestore';

async function getOnboardingInfo(id: string) {
  const docRef = await getDoc(doc(db, 'users', `${id}`));
  if (docRef.exists()) return { id: docRef.id, ...docRef.data() };
  return undefined;
}

const Layout = async ({
  children,
  params: { lang }
}: {
  children: ReactNode;
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);
  const user = JSON.parse(cookies().get('user')?.value as string);
  const userData = await getOnboardingInfo(user.uid);

  return (
    <div className={`bg-neutral-900 flex  h-screen overflow-hidden  sm:p-1.5 sm:gap-1.5 `}>
      <aside>
        <Sidebar dictionary={dictionary} />
      </aside>
      <SellerLayout data={JSON.stringify(userData)}>{children}</SellerLayout>
    </div>
  );
};

export default Layout;
