'use client';

import { auth } from '@/lib/firebase/client';
import useCartStore from '@/state/useCartStore';
import useGuestCartStore from '@/state/useGuestCartStore';
import { CheckIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import useLocale from '@/hooks/useLocale';
import useTransferGroupStore from '@/state/useTransferGroup';
import axios from 'axios';
import Link from 'next/link';

export default function OrderSuccess() {
  const { clearCart, cart } = useCartStore((state: any) => state);
  const { clearGuestCart, guestCart } = useGuestCartStore((state: any) => state);
  const cartItems = auth.currentUser ? cart?.items : guestCart.items;

  const { transferGroup, setTransferGroup } = useTransferGroupStore();

  const locale = useLocale();

  useEffect(() => {
    (async () => {
      if (transferGroup && cartItems) {
        await axios.post('/api/payment/create-transfer-group', {
          transferGroup: transferGroup,
          cartDetails: cartItems
        });
        setTransferGroup(null);
        if (auth.currentUser && cart?.items !== null) {
          clearCart();
        }
        if (!auth.currentUser && guestCart?.items !== null) {
          clearGuestCart();
        }
      }
    })();
  }, [cartItems, transferGroup]);

  return (
    <div className="gap-y-5 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-[100px] h-[100px] bg-primary text-white rounded-full">
        <CheckIcon height={80} width={80} />
      </div>
      <h1 className="text-4xl text-primary">Order Successful</h1>
      <Separator className="my-1" />
      {auth.currentUser ? (
        <Button>
          <Link href={`/${locale}/account?display=order`}>See Orders</Link>
        </Button>
      ) : (
        <Button>
          <Link href={`/${locale}/products`}>Explore Products </Link>
        </Button>
      )}
    </div>
  );
}
