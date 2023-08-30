"use client"
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatters';
import useCartStore from '@/state/useCartStore';
import { cn } from '@/lib/utils';

export default function OrderSummary() {
  const { isCartLoading, cart } = useCartStore((state: any) => state);
  if (!cart?.items?.length) return null;


  return isCartLoading ? <Skeleton className="h-[300px]" /> : (
    <div className={cn("w-full lg:grid-cols-1", !cart?.items?.length && "lg:grid-cols-0")}>
      <div className="bg-neutral-100 rounded-lg p-6">
        <h4 className="font-medium text-lg">Order Summary</h4>

        <div className="mt-8">
          <div className="flex justify-between border-b pb-3">
            <p>Subtotal</p>
            <p className="font-medium">{formatCurrency(cart?.summary.subTotal ?? 0)}</p>
          </div>
          <div className="flex justify-between border-b pt-3 pb-3">
            <p>Shipping estimate</p>
            <p className="font-medium">{formatCurrency(cart?.summary.shipping ?? 0)}</p>
          </div>
          <div className="flex justify-between pb-3 pt-3">
            <p className="font-medium">Order Total</p>
            <p className="font-medium">{formatCurrency(cart?.summary.total ?? 0)}</p>
          </div>
        </div>

        <Link href="/checkout">
          <Button className="w-full mt-4">Checkout</Button>
        </Link>
      </div>
    </div>
  )
}