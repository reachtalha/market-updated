import { Metadata } from 'next';
import BoxedContent from '@/components/common/BoxedContent';
import ShippingInfo from '@/components/common/Buyer/Checkout/ShippingInfo';
import Payment from '@/components/common/Buyer/Checkout/Payment';
import OrderSummaryCheckout from '@/components/common/Buyer/Checkout/OrderSummaryCheckout';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Continue to shipping and payment'
};
export default function Checkout(){
  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <div className="bg-neutral-100 rounded-lg p-6 w-full">
        <div className="grid lg:grid-cols-2 gap-x-10">
          <div>
            <ShippingInfo />
            <h2 className="mt-12 mb-3 text-xl font-medium">Payment</h2>
            <Payment />
          </div>
          <div>
            <OrderSummaryCheckout />
          </div>
        </div>
      </div>
    </BoxedContent>
  )
}