'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import BoxedContent from '@/components/common/BoxedContent';
import ShippingInfo from '@/components/common/Buyer/Checkout/ShippingInfo';
import OrderSummaryCheckout from '@/components/common/Buyer/Checkout/OrderSummaryCheckout';
import CheckoutForm from '@/components/common/Buyer/Checkout/CheckoutForm';
import { Form } from '@/components/ui/form';
import { auth } from '@/lib/firebase/client';
import useCartStore from '@/state/useCartStore';
import toast from 'react-hot-toast';
import useGuestCartStore from '@/state/useGuestCartStore';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Loader from '@/components/common/Loader';
import useLocale from '@/hooks/useLocale';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

const formSchema = z.object({
  email: z.string().min(1, { message: 'required' }).email({
    message: 'Must be a valid email'
  }),
  firstName: z.string().min(1, { message: 'required' }),
  lastName: z.string().min(1, { message: 'required' }),
  address: z.string().min(1, { message: 'required' }),
  city: z.string().min(1, { message: 'required' }),
  state: z.string().min(1, { message: 'required' }),
  phone: z.string().min(1, { message: 'required' })
});

type ShippingAddressType = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  company: string;
  apartment: string;
  city: string;
  address: string;
};

type CartItemType = {
  productId: string;
  quantity: number;
  skuId: string;
};

type ItemsType = CartItemType[];

export default function Checkout({ dictionary }: { dictionary: any }) {
  const { user, isLoading } = useCurrentUser();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<any>();
  const [isPaymentInfoCompleted, setIsPaymentInfoCompleted] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useCartStore((state: any) => state);
  const { guestCart } = useGuestCartStore((state: any) => state);
  const cartItems = auth.currentUser ? cart?.items : guestCart.items;
  const locale = useLocale();

  const submitOrder = async (values: any) => {
    try {
      setIsOrderLoading(true);
      const shops = cartItems?.map((s: any) => {
        return s.shopId;
      });
      const items = cartItems?.map((i: any) => {
        return {
          id: i.docId,
          image: auth.currentUser ? i.image : i.coverImage,
          name: i.name,
          quantity: i.quantity,
          shopId: i.shopId,
          unit: i.unit,
          selectedVariant: {
            id: i.selectedVariant.id,
            color: i.selectedVariant.color,
            measurement: i.selectedVariant.measurement,
            price: i.selectedVariant.price
          }
        };
      });
      const order = {
        shippingAddress: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          country: values.country || 'Pakistan',
          company: values.company,
          apartment: values.apartments || '',
          city: values.city,
          address: values.address,
          email: values.email
        },
        items: items,
        shops: shops,
        status: 'complete',
        userId: auth.currentUser ? auth?.currentUser?.uid : 'guest',
        total: auth.currentUser ? cart?.summary?.total : guestCart?.summary?.total
      };

      await axios.post('/api/checkout', {
        order,
        photoURL: auth.currentUser?.photoURL || 'guest',
        cart: auth.currentUser ? cart : guestCart
      });
      toast.success('We have received your order!');
    } catch (err) {
      console.log(err);
    } finally {
      setIsOrderLoading(false);
    }
  };

  const submitPayment = async (values: any) => {
    if (!stripe || !elements) return;
    if (!isPaymentInfoCompleted) {
      toast.error('Fill Payment info!');
      return;
    }
    await submitOrder(values);

    setProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${DOMAIN}/${locale}/order/success`
      }
    });

    if (result.error) {
      setProcessing(false);
      setError(result.error);
      throw new Error(`Payment failed: ${result.error.message}`);
    } else {
      setProcessing(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: auth.currentUser ? user?.name?.split(' ')[0] : '',
      lastName: auth.currentUser
        ? user?.name?.split(' ').length > 1
          ? user?.name?.split(' ')[1]
          : ''
        : '',
      address: user?.address || '',
      city: user?.city || '',
      state: '',
      phone: user?.phone || ''
    },
    shouldUnregister: false
  });

  useEffect(() => {
    form.reset({
      email: user?.email || '',
      firstName: auth.currentUser ? user?.name?.split(' ')[0] : '',
      lastName: auth.currentUser
        ? user?.name?.split(' ').length > 1
          ? user?.name?.split(' ')[1]
          : ''
        : '',
      address: user?.address || '',
      city: user?.city || '',
      state: '',
      phone: user?.phone || ''
    });
  }, [user]);

  async function onSubmit(values: any) {
    await submitPayment(values);
  }

  const isConfirmButtonLoading = processing || isOrderLoading;
  if (isLoading) return <Loader className="w-full h-96 flex items-center justify-center" />;

  return (
    <BoxedContent className="flex gap-x-5 py-20 mt-8">
      <div className="bg-neutral-100 rounded-lg p-6 w-full">
        <Form {...form}>
          <form className="grid lg:grid-cols-2 gap-x-10" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <ShippingInfo dictionary={dictionary.shippingInfoForm} form={form} />
              <h2 className="mt-12 mb-3 text-xl font-medium">{dictionary.payment.heading}</h2>
              <CheckoutForm onPaymentInfoCompleted={setIsPaymentInfoCompleted} />
            </div>
            <div>
              <OrderSummaryCheckout
                dictionary={dictionary.orderSummary}
                isConfirmButtonLoading={isConfirmButtonLoading}
              />
            </div>
          </form>
        </Form>
      </div>
    </BoxedContent>
  );
}
