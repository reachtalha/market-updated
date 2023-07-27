'use client';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import BoxedContent from '@/components/common/BoxedContent';
import ProductCategories, { Category } from '@/components/common/Buyer/Products/ProductCategories';
import ProductHeader from '@/components/common/Buyer/Products/ProductHeader';
import useCategorySlug from '@/hooks/useCategorySlug';

import product1 from '@/assets/images/product1.webp';

type ProductsProps = {
  categories: Category[];
};
export default function Products({ categories }: ProductsProps) {
  const category = useCategorySlug();

  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <ProductCategories selectedCategory={category} categories={categories} />
      <div className="flex-1 space-y-4">
        <ProductHeader selectedCategory={category} categories={categories} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {Array.from('abcfghyui').map((_, i: number) => (
            <ProductCard
              key={i + Math.random()}
              image={product1}
              name="LIGHTWEIGHT SHEER DAILY SUNSCREEN SPF 40"
              price={23}
              shop="Salt & Stone"
              type="Best Sellers"
            />
          ))}
        </div>
      </div>
    </BoxedContent>
  );
}
