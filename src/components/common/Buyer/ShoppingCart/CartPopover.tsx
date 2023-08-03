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

type CartPopoverProps = {
  trigger: ReactNode
}
export default function CartPopover({ trigger }: CartPopoverProps){
  const router = useRouter();
  const { cartItems } = useCartStore((state: any) => state);

  const handleExploreProducts = () =>  router.push('/products');
  const handleViewCart = () =>  router.push('/cart');

   return (
     <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[320px] pt-3 pl-3 pb-3 pr-3" align="end">
        <ScrollArea className={cn('w-full', cartItems.length > 3 ? 'h-[350px]' : 'h-fit')}>
          <ul className="flex flex-col gap-y-5">
            {cartItems.map((item: any, idx: number) => (
              <li className="flex gap-x-3 pb-4 border-b last:border-0" key={idx}>
                <Image className="border rounded" height={70} width={70} src={item.img} alt={item.name} />
                <div>
                  <h6 className="uppercase font-medium">{item.name}</h6>
                  <p>variant</p>
                </div>
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
          <Button className="w-full">Checkout</Button>
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