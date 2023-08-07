"use client"
import Image from 'next/image';
import { XIcon } from 'lucide-react';

import useCartStore from '@/state/useCartStore';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import QuantityInput from '@/components/common/Buyer/ShoppingCart/QuantityInput';
export default function CartItems(){
  const { cartItems } = useCartStore((state: any) => state);

  return (

     <ul className="flex flex-col gap-y-8">
       {cartItems.map((item: any, idx: number) => (
         <li className="grid grid-cols-4 w-full pb-8 border-b last:border-0" key={idx}>
           <div className="col-span-2 flex items-center gap-x-3">
             <Image className="border rounded" height={150} width={150} src={item.coverImage} alt={item.name} />
             <div className="">
               <h6 className="uppercase font-medium w-[250px]">{item.name}</h6>
               <p>{item?.selectedVariant?.color} / {item?.selectedVariant?.measurement}</p>
               <p className="font-medium">{formatCurrency(item?.selectedVariant?.price)}</p>
             </div>
           </div>
           <div className="col-span-1 flex items-center justify-center">
             <QuantityInput />
           </div>
           <div className="col-span-1 flex justify-end">
             <Button className="border rounded p-1 h-fit" variant="ghost">
               <XIcon height={17} width={17} />
             </Button>
           </div>
         </li>
       ))}
     </ul>
   )
}