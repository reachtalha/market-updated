import Link from 'next/link';

import Hero from '@/components/common/Hero';
import BoxedContent from '@/components/common/BoxedContent';
import CircledArrowRight from '@/assets/icons/system/CircledArrowRight';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';

import Testimonials from '@/components/common/Buyer/Testimonials';
import { getDocs, collection, doc, getDoc, where, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { StaticImageData } from 'next/image';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';

const getProducts = async (shopId: string) => {
  const querySnapshot = await getDocs(
    query(collection(db, 'products'), where('shopId', '==', shopId))
  );

  let products: any = [];

  querySnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return products;
};

const getShop = async (shopId: string) => {
  const querySnapshot = await getDoc(doc(db, 'shops', shopId));

  return querySnapshot.data();
};

type ShopProps = {
  params: {
    shopId: string;
  };
};

type Shop = {
  name: string;
  tagline: string;
  coverImage: StaticImageData;
};

export default async function Shop({ params }: ShopProps) {
  const shop: Shop = (await getShop(params.shopId)) as Shop;
  const products = await getProducts(params.shopId);

  return (
    <>
      <Hero
        className="w-full overflow-hidden text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent"
        img={shop.coverImage}
      >
        <BoxedContent className="flex items-end  w-full h-full">
          <header className="flex w-full justify-between items-center mb-14">
            <div>
              <h1 className="text-7xl uppercase font-medium mb-2">{shop.name}</h1>
              <p className="text-lg">{shop.tagline}</p>
            </div>
            <Link className="self-end flex items-center gap-4 text-lg" href="/shops">
              <span className="uppercase">similar shops</span>
              <CircledArrowRight className="text-transparent" />
            </Link>
          </header>
        </BoxedContent>
      </Hero>
      <div className="grid p-10 grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((_: any, i: number) => (
            <ProductCard
              key={i + Math.random()}
              id={_.id}
              image={_.coverImage}
              name={_.name}
              price={
                _.SKU?.length === 1
                  ? _.SKU[0].price
                  : _.SKU.sort((a: any, b: any) => a.price - b.price)[0].price
              }
              shop={shop.name}
              type={_.type}
            />
          ))
        ) : (
          <div className="text-center flex items-center justify-center   w-[80vw] md:!w-[80vw] h-[40vh] text-gray-500">
            No products found in this shop
          </div>
        )}
      </div>

      <Testimonials />
      <TakeQuizSection />
      <BoxedContent className="my-16">
        <OrganicSimplifiedSection />
      </BoxedContent>
    </>
  );
}
