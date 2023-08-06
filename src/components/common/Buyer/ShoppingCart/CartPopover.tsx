import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button';

import useCartStore from '@/state/useCartStore';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import QuantityInput from '@/components/common/Buyer/ShoppingCart/QuantityInput';

type CartPopoverProps = {
  trigger: ReactNode
}
export default function CartPopover({ trigger }: CartPopoverProps){
  const router = useRouter();
  const { cartItems } = useCartStore((state: any) => state);

  const handleExploreProducts = () =>  router.push('/products');
  const handleViewCart = () =>  router.push('/cart');
  const handleViewCheckout = () =>  router.push('/checkout');

   return (
     <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[600px] p-5" align="end">
        <ScrollArea className={cn('w-full', cartItems.length > 3 ? 'h-[350px]' : 'h-fit')}>
          <ul className="flex flex-col gap-y-5">
            {cartItems.map((item: any, idx: number) => (
              <li className="flex justify-between pb-4 border-b last:border-0" key={idx}>
                <div className="flex items-center gap-x-3">
                  <Image className="border rounded" height={75} width={75} src={item.img} alt={item.name} />
                  <div>
                    <h6 className="uppercase text-sm font-medium w-[250px]">{item.name}</h6>
                    <p>{item?.selectedVariant?.color} / {item?.selectedVariant?.measurement}</p>
                    <p className="font-medium text-sm">{formatCurrency(item?.selectedVariant?.price)}</p>
                  </div>
                </div>
                <div>
                  <QuantityInput />
                </div>
                <Button className="border rounded p-1 h-fit" variant="ghost">
                  <XIcon height={17} width={17} />
                </Button>
              </li>
            ))}
          </ul>
          {!cartItems.length ? <div className="text-center">
            <p>Your Cart is empty!</p>
            <PopoverClose asChild>
              <Button onClick={handleExploreProducts} className="w-full mt-3">
                Explore Products
              </Button>
            </PopoverClose>
          </div> : null}
        </ScrollArea>
        {!!cartItems.length ?
          <>
            <PopoverClose asChild>
              <Button onClick={handleViewCheckout} className="w-full">Checkout</Button>
            </PopoverClose>
            <div className="text-center">
              <PopoverClose asChild>
                <Button variant="link" className="text-[14px] underline" onClick={handleViewCart}>
                  View cart
                </Button>
              </PopoverClose>
            </div>
          </>
        : null}
      </PopoverContent>
    </Popover>
   )
}