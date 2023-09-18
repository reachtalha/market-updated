import AddProduct from '@/components/modules/AddProduct';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

export const metadata = {
  title: 'Add New Product - Seller Central - All Organics',
  description: 'Add new product'
};

const Page = async ({ params: { lang }}: LocaleType) => {
  const dictionary = await getDictionary(lang);
  return <AddProduct dictionary={dictionary} />;
};

export default Page;
