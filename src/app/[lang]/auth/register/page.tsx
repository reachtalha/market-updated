import Register from '@/components/common/Buyer/Auth/Register';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

export const metadata = {
  title: 'Register - All Organics',
  description: 'Register on Organic living, simplied'
};

export default async function Page({ params: { lang } }: LocaleType) {
  const dictionary = await getDictionary(lang);
  return <Register dictionary={dictionary} />;
}
