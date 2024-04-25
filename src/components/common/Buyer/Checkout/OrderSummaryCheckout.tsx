'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import useCartStore from '@/state/useCartStore';
import { formatCurrency } from '@/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import useGuestCartStore from '@/state/useGuestCartStore';
import { auth } from '@/lib/firebase/client';
import QuantityInput from '@/components/common/Buyer/ShoppingCart/QuantityInput';

type OrderSummaryCheckoutProps = {
  isConfirmButtonLoading?: boolean;
  dictionary: any;
};

export default function OrderSummaryCheckout({
  isConfirmButtonLoading = false,
  dictionary
}: OrderSummaryCheckoutProps) {
  const { cart, isCartLoading } = useCartStore((state: any) => state);
  const { guestCart } = useGuestCartStore((state: any) => state);
  const cartItems = auth.currentUser ? cart?.items : guestCart.items;

  const cartSummary = auth.currentUser
    ? {
        subTotal: formatCurrency(cart?.summary?.subTotal ?? 0),
        shipping: formatCurrency(cart?.summary?.shipping ?? 0),
        total: formatCurrency(cart?.summary?.total ?? 0)
      }
    : {
        subTotal: formatCurrency(guestCart?.summary?.subTotal ?? 0),
        shipping: formatCurrency(guestCart?.summary?.shipping ?? 0),
        total: formatCurrency(guestCart?.summary?.total ?? 0)
      };

  return isCartLoading ? (
    <Skeleton className="bg-gray-200 h-[300px]" />
  ) : (
    <div className="bg-white rounded-lg p-6 mt-8 lg:mt-0">
      <h4 className="font-medium mb-6 text-lg">{dictionary.heading}</h4>
      <ul className="flex flex-col gap-y-8">
        {cartItems?.map((item: any) => (
          <li
            className="grid grid-cols-2 w-full pb-8 border-b last:pb-0 last:border-0"
            key={item.id}
          >
            <div className="col-span-2 justify-between flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-3">
                <Image
                  className="border w-full rounded"
                  height={150}
                  width={150}
                  src={auth.currentUser ? item.image : item.coverImage}
                  alt={item.name}
                />
                <div className="">
                  <h6 className="uppercase font-medium">{item.name}</h6>
                  <p>
                    {item?.selectedVariant?.color} / {item?.selectedVariant?.measurement}
                  </p>
                  <p className="font-medium">{formatCurrency(item?.selectedVariant?.price)}</p>
                  <p className="text-sm font-medium text-gray-500">Quantity: {item.quantity}</p>
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
            </div>
          </li>
        ))}
      </ul>
      <Separator className="my-8" />
      <div>
        <div className="flex justify-between border-b pb-3">
          <p>{dictionary.subTotalLabel}</p>
          <p className="font-medium">{cartSummary.subTotal}</p>
        </div>
        <div className="flex justify-between border-b pt-3 pb-3">
          <p>{dictionary.shippingLabel}</p>
          <p className="font-medium">{cartSummary.shipping}</p>
        </div>
        <div className="flex justify-between pb-3 pt-3">
          <p className="font-medium">{dictionary.orderTotalLabel}</p>
          <p className="font-medium">{cartSummary.total}</p>
        </div>
      </div>

      <Button disabled={isConfirmButtonLoading} className="w-full mt-4">
        {isConfirmButtonLoading ? 'Loading' : dictionary.confirmOrderBtnLabel}
      </Button>
    </div>
  );
}
