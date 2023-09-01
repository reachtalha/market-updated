"use client"
import { auth } from '@/lib/firebase/client';
import BoxedContent from '@/components/common/BoxedContent';
import useCartStore from '@/state/useCartStore';
import useGuestCartStore from '@/state/useGuestCartStore';
import { CheckIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OrderSuccess(){
  const router = useRouter();
  const { clearCart } = useCartStore((state: any) => state);
  const { clearGuestCart } = useGuestCartStore((state: any) => state);

  useEffect(() => {
    if(auth.currentUser){
      clearCart();
    }else {
      clearGuestCart();
    }
  }, []);

  return (
    <BoxedContent className="flex flex-col items-center justify-center py-24 mt-14">
      <div className="gap-y-5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[100px] h-[100px] bg-primary text-white rounded-full">
          <CheckIcon height={80} width={80} />
        </div>
        <h1 className="text-4xl text-primary">Order Successful</h1>
        <Separator className="my-1" />
        {auth.currentUser ? <Button onClick={() => router.push('/account?display=order')}>See Orders</Button> : <Button onClick={() => router.push('/products')}>Explore Products</Button>}
      </div>
    </BoxedContent>
  )
}