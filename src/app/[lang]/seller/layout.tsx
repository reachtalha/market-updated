import { ReactNode } from 'react';
import Sidebar from '@/components/common/Seller/Sidebar';
import SellerLayout from '@/components/common/Seller/SellerLayout';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

const Layout = async ({ children, params: { lang } }: { children: ReactNode, params: { lang: Locale} }) => {
  const dictionary = await getDictionary(lang);
  return (
    <div className={`bg-neutral-900 flex  h-screen overflow-hidden  sm:p-1.5 sm:gap-1.5 `}>
      <aside>
        <Sidebar dictionary={dictionary} />
      </aside>
      <SellerLayout>
        {children}
      </SellerLayout>
    </div>
  );
};

export default Layout;
