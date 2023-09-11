import ForYou from '@/components/common/Buyer/ForYou';
import { getDictionary } from '@/get-dictionary';
import { LocaleType } from '@/app/[lang]/(buyer)/page';

export default async function Index({
    params: { lang },
  }: LocaleType) {
  const dictionary = await getDictionary(lang);

  return <ForYou dictionary={dictionary} />;
}
