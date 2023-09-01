'use client';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

import useCartStore from '@/state/useCartStore';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import QuantityInput from '@/components/common/Buyer/ShoppingCart/QuantityInput';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/firebase/client';
import { cn } from '@/lib/utils';
import useGuestCartStore from '@/state/useGuestCartStore';

export default function CartItems() {
  const { cart, deleteFromCart, isCartLoading } = useCartStore((state: any) => state);
  const { guestCart, deleteFromGuestCart } = useGuestCartStore((state: any) => state);
  const router = useRouter();

  const handleOnDelete = (item: any) => {
    if (auth.currentUser) {
      deleteFromCart(item.itemId);
    } else {
      deleteFromGuestCart(item.id, item.selectedVariant.id);
    }
  };
  const handleExploreProducts = () => router.push('/products');

  const cartItems = auth.currentUser ? cart?.items : guestCart.items;

  console.log(cartItems);

  return isCartLoading ? (
    <div className="flex flex-col gap-y-3">
      <Skeleton className="h-[150px]" />
      <Skeleton className="h-[150px]" />
      <Skeleton className="h-[150px]" />
    </div>
  ) : (
    <div className={cn('lg:col-span-2 border-t pt-8', !cartItems.length && 'lg:col-span-3')}>
      {!cartItems?.length ? (
        <div className="mt-8 text-center">
          <p className="text-2xl mb-3">Your Cart is empty!</p>
          <Button onClick={handleExploreProducts} className="mt-3">
            Explore Products
          </Button>
        </div>
      ) : null}
      <ul className="flex flex-col gap-y-8">
        {cartItems?.map((item: any, idx: number) => (
          <li className="grid grid-cols-4 w-full pb-8 border-b last:border-0" key={idx}>
            <div className="col-span-2 flex items-center gap-x-3">
              <Image
                className="border rounded object-contain w-36 h-36"
                height={150}
                width={150}
                src={item.image}
                alt={item.name}
              />
              <div className="">
                <h6 className="uppercase font-medium w-[250px]">{item.name}</h6>
                <p>
                  {item?.selectedVariant?.color} / {item?.selectedVariant?.measurement}
                </p>
                <p className="font-medium">{formatCurrency(item?.selectedVariant?.price)}</p>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <QuantityInput
                quantity={item.quantity}
                productId={item?.id}
                skuId={item?.selectedVariant?.id}
                docId={item.itemId}
              />
            </div>
            <div className="col-span-1 flex justify-end">
              <Button
                onClick={() => handleOnDelete(item)}
                className="border rounded p-1 h-fit"
                variant="ghost"
              >
                <XIcon height={17} width={17} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
