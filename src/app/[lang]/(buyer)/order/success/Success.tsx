'use client';

import { auth } from '@/lib/firebase/client';
import { CheckIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';

export default function OrderSuccess() {
  const locale = useLocale();

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
