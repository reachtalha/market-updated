"use client"

import BoxedContent from "@/common/BoxedContent";
import ProductCategories from "@/common/Buyer/ProductCategories";
import ProductHeader from "@/common/Buyer/ProductHeader";
import Product from "@/common/Buyer/Cards/Product";
import product1 from "@/assets/images/product1.webp";
import useCategorySlug from "@/hooks/useCategorySlug";

export default function Products(){
  const category = useCategorySlug();

  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <ProductCategories selectedCategory={category} />
      <div className="flex-1 space-y-4">
        <ProductHeader title={category} />
        <div className="grid grid-cols-3 gap-5">
          {Array.from("abcfghyui").map((_, i: number) => (
            <Product
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
  )
}