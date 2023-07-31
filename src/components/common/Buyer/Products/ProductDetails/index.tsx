"use client"
import ProductSlider from '@/components/common/Buyer/Products/ProductDetails/ProductSlider';
import Link from 'next/link';
import SelectProductVariant from '@/components/common/Buyer/Products/ProductDetails/SelectProductVariant';

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
    <div className="grid items-center grid-cols-3 gap-x-16">
      <div className="col-span-2">
        <ProductSlider />
      </div>
     <div className="col-span-1">
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
     </div>
    </div>
  )
}