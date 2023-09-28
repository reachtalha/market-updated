import { LocaleType } from '@/app/[lang]/(buyer)/page';
import SellerSettings from '@/components/common/Seller/SellerSettings';
import { getDictionary } from '@/get-dictionary';

const Page = async ({ params: { lang } }: LocaleType) => {
  const dictionary = await getDictionary(lang);
  return <SellerSettings dictionary={dictionary} />;
};

export default Page;
