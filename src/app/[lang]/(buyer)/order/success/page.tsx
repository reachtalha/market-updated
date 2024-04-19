'use client';
import { auth } from '@/lib/firebase/client';
import BoxedContent from '@/components/common/BoxedContent';
import useCartStore from '@/state/useCartStore';
import useGuestCartStore from '@/state/useGuestCartStore';
import { CheckIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useLocale from '@/hooks/useLocale';

export default function OrderSuccess() {
  const { clearCart, cart } = useCartStore((state: any) => state);
  const { clearGuestCart, guestCart } = useGuestCartStore((state: any) => state);
  const locale = useLocale();

  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser && cart?.items !== null) {
      clearCart();
    }

    if (!auth.currentUser && guestCart?.items !== null) {
      clearGuestCart();
    }
  }, [cart.items]);

  return (
    <BoxedContent className="flex flex-col items-center justify-center py-24 min-h-[80vh] mt-14">
      <div className="gap-y-5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[100px] h-[100px] bg-primary text-white rounded-full">
          <CheckIcon height={80} width={80} />
        </div>
        <h1 className="text-4xl text-primary">Order Successful</h1>
        <Separator className="my-1" />
        {auth.currentUser ? (
          <Button onClick={() => router.push(`/${locale}/account?display=order`)}>
            See Orders
          </Button>
        ) : (
          <Button onClick={() => router.push(`/${locale}/products`)}>Explore Products</Button>
        )}
      </div>
    </BoxedContent>
  );
}
