"use client"
import Product from "@/components/common/Buyer/Cards/Product";
import ProductCategories from "@/components/common/Buyer/Products/ProductCategories";
import ProductHeader from "@/components/common/Buyer/Products/ProductHeader";
import useCategorySlug from "@/hooks/useCategorySlug";
import product1 from "@/assets/images/product1.webp";

export default function Products(){
  const category = useCategorySlug();

  return <>
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
  </>
}