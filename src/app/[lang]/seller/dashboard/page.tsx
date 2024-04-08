import Dashboard from '@/components/common/Seller/Dashboard';
import { getDictionary } from '@/get-dictionary';
import { LocaleType } from '@/app/[lang]/(buyer)/page';

export const metadata = {
  title: 'Dashboard - All Organics',
  description: 'Seller Dashboard'
};

export default async function Page({ params: { lang }} : LocaleType) {
  const dictionary = await getDictionary(lang);
  return <Dashboard dictionary={dictionary} />
}
