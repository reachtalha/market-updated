import { LocaleType } from '@/app/[lang]/(buyer)/page';
import Shop from '@/components/modules/Shop';
import { getDictionary } from '@/get-dictionary';

export const metadata = {
  title: 'Shop - Seller Central - All Organics',
  description: 'Seller Shop'
};

export default async function Page({ params: { lang }}: LocaleType){
  const dictionary = await getDictionary(lang);
  return <Shop dictionary={dictionary} />
}