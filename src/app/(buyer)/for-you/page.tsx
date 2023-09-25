import BoxedContent from '@/components/common/BoxedContent';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturesShops from '@/components/common/Buyer/FeaturesShops';
import { Button } from '@/components/ui/button';
import { doc, getDoc, getDocs, collection, query, where, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { cookies } from 'next/headers';
import ForYou from '@/components/common/Buyer/For-you';
const getCategories = async () => {
  const user = JSON.parse(cookies().get('user')?.value as string);

  const userRef = await getDoc(doc(db, 'users', user.uid));
  const categoriesRef = await getDocs(collection(db, 'categories'));
  const categories = categoriesRef.docs.map((doc) => doc.data().title);
  if (userRef.exists()) {
    if (userRef.data().favourites?.length > 0) {
      return categories.filter((c: any) => userRef.data().favourites.includes(c.title));
    }
  }
  return categories;
};
const getProducts = async (categories: any) => {
  const productsRef = await getDocs(
    query(
      collection(db, 'products'),
      where('category', 'in', categories),
      orderBy('__name__'),
      limit(6)
    )
  );

  if (productsRef.empty) return [];

  return productsRef.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
};

export default async function Index() {
  const categories = await getCategories();
  const products = await getProducts(categories);

  return (
    <>
      <ForYou products={JSON.stringify(products)} categories={JSON.stringify(categories)} />

      <section className="bg-black py-10 md:py-16">
        <BoxedContent>
          <header className="text-sm flex-wrap gap-y-4 md:text-lg text-white flex justify-between items-center mb-10">
            <h5 className="uppercase">Shops</h5>
            <Button
              variant="outline"
              size="resp"
              className="border-2 uppercase w-fit bg-transparent text-white rounded-3xl"
            >
              Explore Shop Categories
            </Button>
          </header>
          <FeaturesShops />
        </BoxedContent>
      </section>
      <div className="py-16 px-10">
        <OrganicSimplifiedSection />
      </div>
    </>
  );
}
