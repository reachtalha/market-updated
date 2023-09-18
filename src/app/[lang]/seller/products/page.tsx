import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';
import SellerProducts from '@/components/common/Seller/SellerProducts';

export const metadata = {
  title: 'Products - Seller Central - All Organics',
  description: 'Seller Products'
};

export default async function Page({ params: { lang }}: LocaleType){
  const dictionary = await getDictionary(lang);
  return <SellerProducts dictionary={dictionary} />
}
