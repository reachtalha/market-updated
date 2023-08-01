"use client"
import Link from 'next/link';
import Stars from '@/assets/icons/system/Stars';
import { Button } from '@/components/ui/button';

import ProductSlider from '@/components/common/Buyer/Products/ProductDetails/ProductSlider';
import SelectProductVariant from '@/components/common/Buyer/Products/ProductDetails/SelectProductVariant';
import DetailsAccordion from '@/components/common/Buyer/Products/ProductDetails/DetailsAccordion';
import ProductVideo from '@/components/common/Buyer/Products/ProductDetails/ProductVideo';
import ProductReviews from '@/components/common/Buyer/Products/ProductDetails/ProductReviews';
import ComplementaryProducts from '@/components/common/Buyer/Products/ProductDetails/ComplementaryProducts';
import BlogCard from '@/components/common/Buyer/Products/ProductDetails/BlogCard';


const product = {
  name: 'Body Wash',
  description: 'A multi-benefit, refreshing gel body cleanser with ocean botanicals, antioxidants and natural hydrating ingredients designed to restore skin exposed to the elements. Soften and soothe while cleansing to reverse the drying effects of outdoor activity, wind, sun and sea.',
  price: 87,
  reviews: 332,
  variants: [
    {
      label: 'SANTAL & VETIVER',
      color: 'bg-gray-100'
    },
    {
      label: 'BLACK ROSE & OUD',
      color: 'bg-black-300'
    },
    {
      label: 'BERGAMOT & HINOKI',
      color: 'bg-red-200'
    },
  ]
}


export default function Product(){
  return (
      <>
        <div className="grid items-center gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-16">
          <div className="col-span-2 h-full">
            <ProductSlider />
          </div>
         <div className="w-full md:col-span-1">
           <h1 className="font-regular border-b-2 pb-4 border-black uppercase">{product.name}</h1>
           <span className="block font-sm mt-1 mb-6">15.2   FL   OZ   /   450   ML</span>
           <p className="font-medium">{product.description}</p>
           <p className="font-medium mt-4">Looking for the <Link href="#" className="underline">Body Wash Refill?</Link></p>
           <div className="flex justify-between mt-16">
             <div>
               <p className="text-sm">BLACK ROSE & OUD</p>
               <span className="text-sm">BLACK ROSE & OUD</span>
             </div>
             <SelectProductVariant />
           </div>
           <DetailsAccordion />
           <div className="flex justify-between items-center mt-6">
             <p className="uppercase">reviews</p>
             <div className="flex items-center gap-2">
               <Stars />
               {product.reviews}
             </div>
           </div>

           <Button className="w-full mt-14 uppercase">Add to bag</Button>
         </div>

        </div>
        <div className="grid items-center gap-y-8 grid-cols-1 lg:grid-cols-3 md:gap-x-16">
          <div className="order-2 md:order-1 gap-y-8 flex flex-col lg:flex-row md:gap-x-10 mt-16 h-full col-span-2">
            <BlogCard />
            <BlogCard />
          </div>
          <div className="order-1 md:order-2 col-span-1">
            <ComplementaryProducts />
          </div>
        </div>
        <ProductVideo />
        <ProductReviews />
    </>
  )
}