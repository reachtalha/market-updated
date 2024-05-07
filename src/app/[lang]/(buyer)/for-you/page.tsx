import { getDictionary } from '@/get-dictionary';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import BoxedContent from '@/components/common/BoxedContent';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturesShops from '@/components/common/Buyer/FeaturesShops';
import { Button } from '@/components/ui/button';
import { doc, getDoc, getDocs, collection, query, where, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { cookies } from 'next/headers';
import ForYou from '@/components/common/Buyer/For-you';
import Link from 'next/link';
export const metadata = {
  title: 'For you - All Organics',
  description: 'Products curated for you on Organic living, simplied'
};

const getCategories = async () => {
  const user = JSON.parse(cookies().get('user')?.value as string);
  const userRef = await getDoc(doc(db, 'users', user.uid));
  const categoriesRef = await getDocs(collection(db, 'categories'));
  const categories = categoriesRef.docs.map((doc) => doc.data().title);
  if (userRef.exists()) {
    if (userRef.data().favourites?.length > 0) {
      return categories.filter((category: string) => userRef.data().favourites.includes(category));
    }
  }
  return categories;
};

const getProducts = async (categories: any) => {
  const productsRef = await getDocs(
    query(collection(db, 'products'), where('category', 'in', categories), limit(11))
  );
  const list: any = [];
  productsRef.forEach((p) => {
    list.push({
      id: p.id,
      ...p.data()
    });
  });
  return list;
};

export default async function Index({ params: { lang } }: LocaleType) {
  const categories = await getCategories();
  const products = await getProducts(categories);
  const dictionary = await getDictionary(lang);
  return (
    <>
      <ForYou products={JSON.stringify(products)} categories={JSON.stringify(categories)} />
      <section className="bg-black py-10 md:py-16">
        <BoxedContent>
          <header className="text-sm flex-wrap gap-y-4 md:text-lg text-white flex justify-between items-center mb-10">
            <h5 className="uppercase">{dictionary.forYou.shopsLabel}</h5>
            <Button
              variant="outline"
              size="resp"
              className="border-2 uppercase w-fit bg-transparent text-white rounded-3xl"
            >
              <Link href={`/${lang}/products`}>{dictionary.forYou.exploreShopsLabel}</Link>
            </Button>
          </header>
          <FeaturesShops />
        </BoxedContent>
      </section>
      <BoxedContent className="py-16">
        <OrganicSimplifiedSection
          title={dictionary.home.bloggingSection.title}
          tag={dictionary.home.bloggingSection.tag}
        />
      </BoxedContent>
    </>
  );
}
