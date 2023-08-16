'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import useCartStore from '@/state/useCartStore';
import { formatCurrency } from '@/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';

type OrderSummaryCheckoutProps = { isConfirmButtonLoading?: boolean };

export default function OrderSummaryCheckout({
  isConfirmButtonLoading = false
}: OrderSummaryCheckoutProps) {
  const { cart, isCartLoading } = useCartStore((state: any) => state);

  return isCartLoading ? (
    <Skeleton className="bg-gray-200 h-[300px]" />
  ) : (
    <div className="bg-white rounded-lg p-6 mt-8 lg:mt-0">
      <h4 className="font-medium mb-6 text-lg">Order Summary</h4>
      <ul className="flex flex-col gap-y-8">
        {cart?.items?.map((item: any) => (
          <li
            className="grid grid-cols-2 w-full pb-8 border-b last:pb-0 last:border-0"
            key={item.id}
          >
            <div className="col-span-2 flex items-center gap-x-3">
              <Image
                className="border rounded"
                height={150}
                width={150}
                src={item.image}
                alt={item.name}
              />
              <div className="">
                <h6 className="uppercase font-medium">{item.name}</h6>
                <p>
                  {item?.selectedVariant?.color} / {item?.selectedVariant?.measurement}
                </p>
                <p className="font-medium">{formatCurrency(item?.selectedVariant?.price)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Separator className="my-8" />
      <div>
        <div className="flex justify-between border-b pb-3">
          <p>Subtotal</p>
          <p className="font-medium">{formatCurrency(cart?.summary?.total)}</p>
        </div>
        <div className="flex justify-between border-b pt-3 pb-3">
          <p>Shipping estimate</p>
          <p className="font-medium">{formatCurrency(cart?.summary?.shipping)}</p>
        </div>
        <div className="flex justify-between pb-3 pt-3">
          <p className="font-medium">Order Total</p>
          <p className="font-medium">
            {formatCurrency(cart?.summary?.total)}
          </p>
        </div>
      </div>

      <Button className="w-full mt-4">{isConfirmButtonLoading ? 'Loading' : 'Confirm'}</Button>
    </div>
  );
}
