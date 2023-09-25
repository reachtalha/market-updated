import Index from '@/components/common/Buyer/Account/index';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

type Props = {};

const Page = async ({ params: { lang } }: LocaleType) => {
  const dictionary = await getDictionary(lang);
  const options = [
    {
      name: dictionary.account.sectionHeadings.profile,
      slug: 'settings',
      href: '/account?display'
    },
    {
      name: dictionary.account.sectionHeadings.wishList,
      slug: 'wishlist',
      href: '/account?display'
    },
    {
      name: dictionary.account.sectionHeadings.orderHistory,
      slug: 'order',
      href: '/account?display'
    }
  ];

  return <Index dictionary={dictionary} options={options} />;
};

export default Page;
