'use client';
import Checkout from '@/components/common/Buyer/Checkout';
import Payment from '@/components/common/Buyer/Checkout/Payment';
import Loader from '@/components/common/Loader';
import { useCurrentUser } from '@/hooks/useCurrentUser';
export default function Page() {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Loader className="w-full h-96 flex items-center justify-center" />;
  return (
    <Payment>
      <Checkout user={user} />
    </Payment>
  );
}
