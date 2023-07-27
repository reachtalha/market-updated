"use client";

import BoxedContent from "@/components/common/BoxedContent";
import MarketCategories, {
  Category,
} from "@/components/common/Buyer/Market/MarketCategories";
import ProductHeader from "@/components/common/Buyer/Products/ProductHeader";
import useCategorySlug from "@/hooks/useCategorySlug";
import { Button } from "@/components/ui/button";
import TakeQuizSection from "@/components/common/Buyer/TakeQuizSection";
import OrganicSimplifiedSection from "@/components/common/Buyer/OrganicSimplifiedSection";
import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';
import market1 from "@/assets/images/market1.png";
import ShopCard from '@/components/common/Buyer/Cards/ShopCard';

type MarketProps = {
  categories: Category[];
};
export default function Market({ categories }: MarketProps) {
  const category = useCategorySlug();

  return (
    <>
      <BoxedContent className='flex gap-x-5 py-20'>
        <MarketCategories selectedCategory={category} categories={categories} />
        <div className='flex-1 space-y-4'>
          <ProductHeader selectedCategory={category} categories={categories} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {Array.from("abcfghyu").map((_, i: number) => (
              <ShopCard
                key={i + Math.random()}
                image={market1}
                desc='Find harmony with nature as you flow through your practice, surrounded by the pure essence of organic yoga products that honor your well-being and the planet.'
                shop='Salt & Stone'
                type='Skin Care'
              />
            ))}
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
            >
              Explore Expert Categories
            </Button>
          </header>
          <FeaturedExperts />
        </BoxedContent>
      </section>
      <TakeQuizSection />
      <div className='py-16 px-10'>
        <OrganicSimplifiedSection />
      </div>
    </>
  );
}
