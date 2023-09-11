import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';
import Market from '@/components/common/Buyer/Market/Index';

const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  let categories: any = [];

  querySnapshot.forEach((doc) => {
    categories.push({
      name: doc.data().title,
      subCategories: doc.data().list,
      lifeSpan: doc.data().lifeSpaan,
      image: doc.data().image,
      slug: doc.data().title,
      href: '/market?category'
    });
  });
  return categories;
};

const Page = async ({
                      params: { lang },
                    }: LocaleType) => {
  const dictionary = await getDictionary(lang);
  const categories = await getCategories();

  return <Market dictionary={dictionary} categories={categories} />;
};

export default Page;
