'use client';

import BoxedContent from '@/components/common/BoxedContent';
import MarketCategories, { Category } from '@/components/common/Buyer/Market/MarketCategories';
import useCategorySlug from '@/hooks/useCategorySlug';
import { Button } from '@/components/ui/button';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';
import ShopCard from '@/components/common/Buyer/Cards/ShopCard';
import MarketHeader from '@/components/common/Buyer/Market/MarketHeader';
import Loader from '@/components/common/Loader';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSwr from 'swr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSortingStore from '@/state/useSortingStore';

const getShops = async () => {
  let shops: any = [];
  const querySnapshot = await getDocs(collection(db, 'shops'));

  querySnapshot.forEach((doc: any) => {
    shops.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return shops;
};

type MarketProps = {
  categories: Category[];
};
export default function Market({ categories }: MarketProps) {
  const router = useRouter();
  const category = useCategorySlug();
  const [filteredShops, setFilteredShops] = useState([]);
  const sortShopsBy = useSortingStore((state: any) => state.sortShopsBy);

  const { data: shops, isLoading, error } = useSwr('shops', () => getShops());

  useEffect(() => {
    if (shops) {
      if (category === 'all') {
        setFilteredShops(shops);
      } else {
        const filteredShops = shops.filter((shop: any) => shop.category.split('&')[0] === category);
        setFilteredShops(filteredShops || []);
      }
    }
  }, [shops, category]);

  console.log('sort', sortShopsBy);

  useEffect(() => {
    if (shops) {
      if (sortShopsBy === 'name') {
       
        setFilteredShops(filteredShops.sort((a: any, b: any) => a.name.localeCompare(b.name)));
      }
    }
  }, [sortShopsBy]);
  if (isLoading) return <Loader className="h-screen w-screen flex items-center justify-center" />;

  return (
    <>
      <BoxedContent className="flex gap-x-5 py-20">
        <MarketCategories selectedCategory={category} categories={categories} />
        <div className="flex-1 space-y-4">
          <MarketHeader selectedCategory={category} categories={categories} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredShops.length > 0 ? (
              filteredShops.map((shop: any, i: number) => (
                <ShopCard
                  key={i + Math.random()}
                  id={shop.id}
                  image={shop.coverImage}
                  desc={shop.tagline}
                  shop={shop.name}
                  type={shop.category}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-[80vw] h-96">
                <h3 className="text-xl text-gray-500">No Shops Found</h3>
              </div>
            )}
          </div>
        </div>
      </BoxedContent>
      <section className="bg-black py-10 md:py-16">
        <BoxedContent>
          <header className="text-sm flex-wrap gap-y-4 md:text-lg text-white flex justify-between items-center mb-10">
            <h5 className="uppercase">Our Featured And Latest Experts</h5>
            <Button
              variant="outline"
              size="resp"
              className="border-2 uppercase w-fit bg-transparent text-white rounded-3xl"
              onClick={() => router.push('/experts')}
            >
              Explore Expert Categories
            </Button>
          </header>
          <FeaturedExperts />
        </BoxedContent>
      </section>
      <TakeQuizSection />
      <div className="py-16 px-10">
        <OrganicSimplifiedSection />
      </div>
    </>
  );
}
