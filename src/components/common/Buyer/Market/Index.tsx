'use client';

import MarketCard from '@/components/common/Buyer/Cards/MarketCard';

import BoxedContent from '@/components/common/BoxedContent';
import MarketCategories, { Category } from '@/components/common/Buyer/Market/MarketCategories';
import ProductHeader from '@/components/common/Buyer/Products/ProductHeader';
import useCategorySlug from '@/hooks/useCategorySlug';
import market1 from '@/assets/images/market1.png';
import FeaturedExpertCard from '@/components/common/Buyer/Cards/FeaturedExpertCard';
import { Button } from '@/components/ui/button';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';

type MarketProps = {
  categories: Category[];
};
export default function Market({ categories }: MarketProps) {
  const category = useCategorySlug();

  return (
    <>
      {' '}
      <BoxedContent className="flex gap-x-5 py-20">
        <MarketCategories selectedCategory={category} categories={categories} />
        <div className="flex-1 space-y-4">
          <ProductHeader selectedCategory={category} categories={categories} />
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-5">
            {Array.from('abcfghyu').map((_, i: number) => (
              <MarketCard
                key={i + Math.random()}
                image={market1}
                desc="Find harmony with nature as you flow through your practice, surrounded by the pure essence of organic yoga products that honor your well-being and the planet."
                shop="Salt & Stone"
                type="Skin Care"
              />
            ))}
          </div>
        </div>
      </BoxedContent>
      <div className="p-10 bg-black">
        <div className="flex mb-6 flex-row items-center justify-between">
          <span className="uppercase text-white">our featured and latest experts</span>
          <Button className="uppercase bg-transparent hover:bg-transparent  border rounded-3xl">
            Explore expoert categories
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-5  ">
          {Array.from('ab').map((_, i: number) => (
            <FeaturedExpertCard
              key={i + Math.random()}
              expert={{
                name: 'Matthew Barnes',
                description:
                  'Find harmony with nature as you flow through your practice, surrounded by the pure\n' +
                  'essence of organic yoga products that honor your well-being and the planet.'
              }}
            />
          ))}
        </div>
      </div>
      <TakeQuizSection />
      <div className="py-16 px-10">
        <OrganicSimplifiedSection />
      </div>
    </>
  );
}
