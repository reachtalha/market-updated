import Link from 'next/link';

import BoxedContent from '@/components/common/BoxedContent';

import MarketCategories, { Category } from '@/components/common/Buyer/Market/MarketCategories';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';

import MarketHeader from '@/components/common/Buyer/Market/MarketHeader';
import Markets from './Markets';
import LoadMore from './LoadMore';

type MarketProps = {
  categories: Category[];
  shopsJSON: any;
  category: string;
  sortBy: string;
  dictionary?: any;
  lang: string;
};
export default function Market({
  categories,
  shopsJSON,
  category,
  dictionary,
  lang,
  sortBy = 'latest'
}: MarketProps) {
  const markets = JSON.parse(shopsJSON);
  return (
    <>
      <BoxedContent className="flex gap-x-5 py-20 mt-8">
        <MarketCategories locale={lang} selectedCategory={category} categories={categories} />
        <div className="flex-1 space-y-4">
          <MarketHeader selectedCategory={category} categories={categories} sortBy={sortBy} />

          <LoadMore markets={markets} />
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
        <OrganicSimplifiedSection
          title={dictionary.home.bloggingSection.title}
          tag={dictionary.home.bloggingSection.tag}
        />
      </div>
    </>
  );
}
