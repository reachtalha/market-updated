import ForYou from '@/components/common/Buyer/ForYou';
import { getDictionary } from '@/get-dictionary';
import { LocaleType } from '@/app/[lang]/(buyer)/page';

export const metadata = {
  title: 'For you - All Organics',
  description: 'Products curated for you on Organic living, simplied'
};

export default async function Index({ params: { lang } }: LocaleType) {
  const dictionary = await getDictionary(lang);
  return <ForYou dictionary={dictionary} />;
}
