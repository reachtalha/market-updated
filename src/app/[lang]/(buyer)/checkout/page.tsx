import Checkout from '@/components/common/Buyer/Checkout';
import Payment from '@/components/common/Buyer/Checkout/Payment';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

export const metadata = {
  title: 'Checkout - All Organics',
  description: 'Checkout on Organic living, simplied'
};
export default async function Page({ params: { lang }}: LocaleType) {
  const dictionary = await getDictionary(lang);
  return (
    <Payment>
      <Checkout dictionary={dictionary.checkout} />
    </Payment>
  );
}
