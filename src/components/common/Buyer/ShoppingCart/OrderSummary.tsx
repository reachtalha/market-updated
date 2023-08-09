"use client"
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatters';
import useCartStore from '@/state/useCartStore';

export default function OrderSummary() {
  const { isCartLoading, cart } = useCartStore((state: any) => state);
  if (cart?.items?.length < 1) return;
  const getSubTotal = () => {
    if (!cart?.items || cart.items.length === 0) {
      return 0;
    }

    return cart.items.reduce((sum: number, item: any) => {
      const itemTotal = item.quantity * item.selectedVariant.price;
      return sum + itemTotal;
    }, 0);
  };

  const subTotal = getSubTotal();
  return isCartLoading ? <Skeleton className="h-[300px]" /> : (
    <div className="bg-neutral-100 rounded-lg p-6">
      <h4 className="font-medium text-lg">Order Summary</h4>

      <div className="mt-8">
        <div className="flex justify-between border-b pb-3">
          <p>Subtotal</p>
          <p className="font-medium">{formatCurrency(subTotal)}</p>
        </div>
        <div className="flex justify-between border-b pt-3 pb-3">
          <p>Shipping estimate</p>
          <p className="font-medium">{formatCurrency(cart?.summary?.shipping)}</p>
        </div>
        <div className="flex justify-between pb-3 pt-3">
          <p className="font-medium">Order Total</p>
          <p className="font-medium">{formatCurrency(subTotal + cart?.summary?.shipping)}</p>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="w-full mt-4">Checkout</Button>
      </Link>
    </div>
  )
}