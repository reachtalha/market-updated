import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import BoxedContent from '@/components/common/BoxedContent';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturesShops from '@/components/common/Buyer/FeaturesShops';
import { Button } from '@/components/ui/button';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { cookies } from 'next/headers';
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
    query(collection(db, 'products'), where('category', 'in', categories))
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
      <div className="gap-x-5 p-20 mt-8 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((_: any, i: number) => (
            <ProductCard
              key={i + Math.random()}
              id={_.id}
              image={_.coverImage}
              name={_.name}
              price={_.price}
              shop={_.shopName || 'some shop'}
              type={_.type}
            />
          ))
        ) : (
          <div className="text-center flex items-center justify-center  w-[80vw] md:!w-[80vw] h-[40vh] text-gray-500">
            No products found for you
          </div>
        )}
      </div>
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
