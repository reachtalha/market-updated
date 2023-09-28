import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Blog from '@/components/common/Blog/blog';
export type LocaleType = {
  params: {
    lang: Locale;
  };
};
const Layout = async ({ children, params }: { children: React.ReactNode; params: any }) => {
  const dictionary = await getDictionary(params?.lang);

  return <Blog dictionary={dictionary}>{children}</Blog>;
};

export default Layout;
