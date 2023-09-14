import Products from '@/components/common/Buyer/Products';
import BoxedContent from '@/components/common/BoxedContent';
import { Button } from '@/components/ui/button';
import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import LatestBlogsSection from '@/components/common/Buyer/LatestBlogsSection';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

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
      href: '/products?category'
    });
  });
  return categories;
};

export default async function SearchProducts({ params: { lang } } : LocaleType) {
  const categories = await getCategories();
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Products categories={categories} />
      <section className="bg-black  py-16">
        <BoxedContent>
          <header className="text-sm flex-wrap gap-y-4 md:text-lg text-white flex justify-between items-center mb-10">
            <h5 className="uppercase">Our Featured And Latest Experts</h5>
            <Button
              variant="outline"
              size="resp"
              className="border-2 uppercase w-fit bg-transparent text-white rounded-3xl"
            >
              Explore Expert Categories
            </Button>
          </header>
          <FeaturedExperts dictionary={dictionary} />
        </BoxedContent>
      </section>
      <TakeQuizSection className="bg-[#F7F6F2] text-black" buttonClassName="border-black" />
      <LatestBlogsSection className="mt-16" title="#OrganicSimplified" />
    </>
  );
}
