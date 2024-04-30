'use client';
import BoxedContent from '@/components/common/BoxedContent';
import Title from '@/components/common/Seller/Shared/Title';
import SellerPaymentInfo from '@/components/modules/OnBoarding/SellerPaymentInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import useLocale from '@/hooks/useLocale';
import Loader from '@/components/common/Loader';

const ConnectStripe = () => {
  const router = useRouter();
  const locale = useLocale();
  const { user, isLoading } = useCurrentUser();

  if (!isLoading && !user) {
    router.push(`/${locale}/onboarding/?id=${auth.currentUser?.uid}`);
    return (
      <div className="w-screen bg-white h-screen overflow-hidden grid place-content-center">
        <Loader />
      </div>
    );
  }
  if (!isLoading && user.stripeConnectId) {
    router.push(`/seller/dashboard`);
    return (
      <div className="w-screen bg-white h-screen overflow-hidden grid place-content-center">
        <Loader />
      </div>
    );
  }

  if (!isLoading && !user.stripeConnectId) {
    return (
      <BoxedContent className="py-5">
        <Title title="Connect with Stripe" />
        <div className="container-sm flex w-full h-full justify-center items-center">
          <div className="w-full h-full md:w-1/2">
            <SellerPaymentInfo
              title={'Connect with Stripe for Payouts'}
              description={
                'Start receiving payouts seamlessly by connecting your account with Stripe. By linking your account, you can easily manage your earnings and streamline your payment process.'
              }
            />
          </div>
        </div>
      </BoxedContent>
    );
  }
  return null;
};

export default ConnectStripe;
