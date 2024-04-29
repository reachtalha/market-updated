'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import BoxedContent from '@/components/common/BoxedContent';
import ShippingInfo from '@/components/common/Buyer/Checkout/ShippingInfo';
import OrderSummaryCheckout from '@/components/common/Buyer/Checkout/OrderSummaryCheckout';
import CheckoutForm from '@/components/common/Buyer/Checkout/CheckoutForm';
import Loader from '@/components/common/Loader';

import useCartStore from '@/state/useCartStore';
import useGuestCartStore from '@/state/useGuestCartStore';
import useTransferGroupStore from '@/state/useTransferGroup';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import useLocale from '@/hooks/useLocale';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

const formSchema = z.object({
  email: z.string().min(1, { message: 'Please enter your email' }).email({
    message: 'Please enter a valid email address'
  }),
  firstName: z.string().min(1, { message: 'Please enter your first name' }),
  lastName: z.string().min(1, { message: 'Please enter your last name' }),
  address: z.string().min(1, { message: 'Please enter your address' }),
  city: z.string().min(1, { message: 'Please enter your city' }),
  state: z.string().min(1, { message: 'Please enter your state' }),
  phone: z.string().min(1, { message: 'Please enter your phone number' })
});

type FormValues = z.infer<typeof formSchema>;

const getOrdeDetails = (values: any, cart: any) => {
  const shops = cart?.map((s: any) => {
    return s.shopId;
  });
  const items = cart?.map((i: any) => {
    return {
      id: i.docId,
      stripeConnectId: i?.stripeConnectId,
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
  return {
    shippingAddress: {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      city: values.city,
      address: values.address,
      email: values.email
    },
    items: items,
    shops: shops,
    status: 'processing',
    userId: auth.currentUser ? auth?.currentUser?.uid : 'guest',
    total: cart?.summary?.total
  };
};

export default function Checkout({ dictionary }: { dictionary: any }) {
  const { user, isLoading } = useCurrentUser();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const { cart, clearCart: authenticatedUserCart } = useCartStore((state: any) => state);
  const { guestCart, clearGuestCart } = useGuestCartStore((state: any) => state);
  const { transferGroup } = useTransferGroupStore();

  const [processing, setProcessing] = useState(false);
  const [isPaymentInfoCompleted, setIsPaymentInfoCompleted] = useState(false);

  const cartItems = auth.currentUser ? cart?.items : guestCart.items;
  const clearCart = auth.currentUser ? authenticatedUserCart : clearGuestCart;
  const locale = useLocale();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldUnregister: false
  });

  useEffect(() => {
    if (user) {
      const [firstName = '', lastName = ''] = auth.currentUser?.displayName?.split(' ') || ['', ''];
      form.reset({
        email: user?.email || '',
        firstName: firstName,
        lastName: lastName,
        address: user?.address || '',
        city: user?.city || '',
        state: '',
        phone: `+${user?.countryCode}${user?.phone}` || ''
      });
    }
  }, [form, user]);

  async function onSubmit(values: FormValues) {
    try {
      if (!stripe || !elements) {
        throw new Error('Stripe or Elements is not initialized.');
      }

      if (!isPaymentInfoCompleted) {
        throw new Error('Please fill in your payment information.');
      }

      setProcessing(true);

      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${DOMAIN}/${locale}/order/success`
        },
        redirect: 'if_required'
      });

      if (stripeError) {
        console.log(stripeError);
        throw new Error('Stripe payment confirmation failed.');
      }

      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        throw new Error('Payment not succeeded.');
      }

      const order = getOrdeDetails(values, cartItems);

      const orderPromise = axios.post('/api/checkout', {
        order,
        photoURL: auth.currentUser?.photoURL || '',
        cart: cartItems
      });

      const chargeTransferPromise = axios.post('/api/payment/create-transfer-group', {
        transferGroup: transferGroup,
        cartDetails: cartItems
      });

      await Promise.all([orderPromise, chargeTransferPromise]);

      clearCart();
      toast.success('Your payment has been successfully processed!');
      router.replace(`${DOMAIN}/${locale}/order/success?payment_intent=${paymentIntent?.id}`);
      return <Loader className="grid place-content-center w-screen h-screen overflow-hidden" />;
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during payment processing. Please try again.');
    } finally {
      setProcessing(false);
    }
  }

  const isConfirmButtonLoading = processing;
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
