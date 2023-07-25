"use client";

import MarketCard from "@/components/common/Buyer/Cards/MarketCard";

import BoxedContent from "@/components/common/BoxedContent";
import MarketCategories, {
  Category,
} from "@/components/common/Buyer/Market/MarketCategories";
import ProductHeader from "@/components/common/Buyer/Products/ProductHeader";
import useCategorySlug from "@/hooks/useCategorySlug";
import market1 from "@/assets/images/market1.png";
import product1 from "@/assets/images/product1.webp";
import FeaturedExpertCard from "@/components/common/Buyer/Cards/FeaturedExpertCard";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/FallbackImage";

type MarketProps = {
  categories: Category[];
};
export default function Market({ categories }: MarketProps) {
  const category = useCategorySlug();

  return (
    <>
      {" "}
      <BoxedContent className='flex gap-x-5 py-20'>
        <MarketCategories selectedCategory={category} categories={categories} />
        <div className='flex-1 space-y-4'>
          <ProductHeader title={category} />
          <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-5'>
            {Array.from("abcfghyu").map((_, i: number) => (
              <MarketCard
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
      <div className='p-10 bg-black'>
        <div className='flex mb-6 flex-row items-center justify-between'>
          <span className='uppercase text-white'>
            our featured and latest experts
          </span>
          <Button className='uppercase bg-transparent hover:bg-transparent  border rounded-3xl'>
            Explore expoert categories
          </Button>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-5  '>
          {Array.from("ab").map((_, i: number) => (
            <FeaturedExpertCard
              key={i + Math.random()}
              expert={{
                name: "Matthew Barnes",
                description:
                  "Find harmony with nature as you flow through your practice, surrounded by the pure\n" +
                  "essence of organic yoga products that honor your well-being and the planet.",
              }}
            />
          ))}
        </div>
      </div>
      <div className='h-[50vh] flex flex-col items-center py-16 bg-[#F7F6F2] '>
        <span className='text-7xl leading-[5rem] font-medium font-america '>
          Organic products{" "}
          <span className='font-alpina font-normal italic'>
            curated for you.
          </span>
        </span>
        <span className='text-2xl font-medium mb-8  '>
          Get personalized product picks from a Real Expert - for free.
        </span>
        <Button className='uppercase text-black border-black bg-transparent hover:bg-transparent  border rounded-3xl'>
          Take our quiz
        </Button>
      </div>
      <div className='flex flex-col py-20 px-10'>
        <div className='flex mb-6 font-medium text-xl flex-row items-center justify-between'>
          <span>#OrganicSimplified</span>
          <span>@allorganicsmarket</span>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {Array.from("abc").map((_, i: number) => (
            <Image alt={"product"} key={i + Math.random()} src={product1} />
          ))}
        </div>
      </div>
    </>
  );
}
