import Link from 'next/link';

import BoxedContent from '@/components/common/BoxedContent';

import MarketCategories, { Category } from '@/components/common/Buyer/Market/MarketCategories';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';
import ShopCard from '@/components/common/Buyer/Cards/ShopCard';
import MarketHeader from '@/components/common/Buyer/Market/MarketHeader';

type MarketProps = {
  categories: Category[];
  shopsJSON: any;
  category: string;
};
export default function Market({ categories, shopsJSON, category }: MarketProps) {
  const shops = JSON.parse(shopsJSON);
  return (
    <>
      <BoxedContent className="flex gap-x-5 py-20 mt-8">
        <MarketCategories selectedCategory={category} categories={categories} />
        <div className="flex-1 space-y-4">
          <MarketHeader selectedCategory={category} categories={categories} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {shops.length > 0 ? (
              shops.map((shop: any, i: number) => (
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
            <Link
              href="/experts"
              className="border-2 uppercase duration-200 text-sm 2xl:text-base transition-colors ease-in w-fit bg-transparent hover:bg-neutral-50 hover:text-neutral-900 text-neutral-50 rounded-full px-6 py-2"
            >
              Explore Expert Categories
            </Link>
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
