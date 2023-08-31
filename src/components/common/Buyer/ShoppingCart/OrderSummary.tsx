"use client"
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatters';
import useCartStore from '@/state/useCartStore';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase/client';
import useGuestCartStore from '@/state/useGuestCartStore';

export default function OrderSummary() {
  const { isCartLoading, cart } = useCartStore((state: any) => state);
  const { guestCart } = useGuestCartStore((state: any) => state);
  const cartItems = auth.currentUser ? cart?.items : guestCart.items;

  if (!cartItems?.length) return null;

  const cartSummary = auth.currentUser ? {
    subTotal: formatCurrency(cart?.summary?.subTotal ?? 0),
    shipping: formatCurrency(cart?.summary?.shipping ?? 0),
    total: formatCurrency(cart?.summary?.total ?? 0),
  } : {
    subTotal: formatCurrency(guestCart?.summary?.subTotal ?? 0),
    shipping: formatCurrency(guestCart?.summary?.shipping ?? 0),
    total: formatCurrency(guestCart?.summary?.total ?? 0)
  };


  return isCartLoading ? <Skeleton className="h-[300px]" /> : (
    <div className={cn("w-full lg:grid-cols-1", !cartItems?.length && "lg:grid-cols-0")}>
      <div className="bg-neutral-100 rounded-lg p-6">
        <h4 className="font-medium text-lg">Order Summary</h4>

        <div className="mt-8">
          <div className="flex justify-between border-b pb-3">
            <p>Subtotal</p>
            <p className="font-medium">{cartSummary.subTotal}</p>
          </div>
          <div className="flex justify-between border-b pt-3 pb-3">
            <p>Shipping estimate</p>
            <p className="font-medium">{cartSummary.shipping}</p>
          </div>
          <div className="flex justify-between pb-3 pt-3">
            <p className="font-medium">Order Total</p>
            <p className="font-medium">{cartSummary.total}</p>
          </div>
        </div>

        <Link href="/checkout">
          <Button className="w-full mt-4">Checkout</Button>
        </Link>
      </div>
    </div>
  )
}