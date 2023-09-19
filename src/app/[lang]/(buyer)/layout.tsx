import Header from '@/components/common/Buyer/Layout/Header';
import Footer from '@/components/common/Buyer/Layout/Footer';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

const Layout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(params.lang);
  return (
    <>
      <header className="w-full fixed top-0 z-50">
        <Header dictionary={dictionary} />
      </header>

      <main>{children}</main>
      <Footer locale={params.lang} dictionary={dictionary} />
    </>
  );
};

export default Layout;
