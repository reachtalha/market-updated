import BoxedContent from '@/components/common/BoxedContent';
import Title from '@/components/common/Seller/Shared/Title';
import SellerPaymentInfo from '@/components/modules/OnBoarding/SellerPaymentInfo';
const ConnectStripe = () => {
  return (
    <BoxedContent className="py-5">
      <Title title="Connect with Stripe" />
      <div className="container-sm flex w-full h-full justify-center items-center">
        <div className="w-full h-full md:w-1/2">
          <SellerPaymentInfo
            title={`Looks like your Stripe Payout is not set up`}
            description={
              'Before proceeding you should set up you stripe payouts. Once that is done you will start receiving payouts seamlessly by connecting your account with Stripe. By linking your account, you can easily manage your earnings and streamline your payment process.'
            }
          />
        </div>
      </div>
    </BoxedContent>
  );
};

export default ConnectStripe;
