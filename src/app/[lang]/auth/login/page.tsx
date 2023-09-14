import Login from '@/components/common/Buyer/Auth/Login';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

export const metadata = {
  title: 'Login - All Organics',
  description: 'Continue to Organic living, simplied'
};

export default async function Page({ params: { lang } }: LocaleType) {
  const dictionary = await getDictionary(lang);

  return <Login dictionary={dictionary} />;
}
