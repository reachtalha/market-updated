'use client';
import { useState } from 'react';
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

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

const formSchema = z.object({
  email: z.string().min(1, { message: 'required' }).email({
    message: 'Must be a valid email'
  }),
  firstName: z.string().min(1, { message: 'required' }),
  lastName: z.string().min(1, { message: 'required' }),
  company: z.string().min(1, { message: 'required' }),
  address: z.string().min(1, { message: 'required' }),
  apartments: z.string().min(1, { message: 'required' }),
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

export default function Checkout({ user }: { user: any }) {
  const [processing, setProcessing] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useCartStore((state: any) => state);
  const { guestCart, clearGuestCart } = useGuestCartStore((state: any) => state);
  const cartItems = auth.currentUser ? cart?.items : guestCart.items;

  const submitPayment = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${DOMAIN}/account?display=order`
      }
    });

    if (result.error) {
      setProcessing(false);
      throw new Error(`Payment failed: ${result.error.message}`);
    } else {
      setProcessing(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: auth.currentUser ? user.name.split(' ')[0] : '',
      lastName: auth.currentUser
        ? user.name.split(' ').length > 1
          ? user.name.split(' ')[1]
          : ''
        : '',
      company: '',
      address: user?.address || '',
      apartments: '',
      city: user?.city || '',
      state: '',
      phone: user?.phone || ''
    },
    shouldUnregister: false
  });
  async function onSubmit(values: any) {
    try {
      setIsOrderLoading(true);
      await submitPayment();
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
        status: 'pending',
        shops: shops,
        userId: auth.currentUser ? cart?.userId : 'guest',
        total: auth.currentUser ? cart?.summary?.total : guestCart?.summary?.total
      };

      await axios.post('/api/checkout', {
        order,
        photoURL: auth.currentUser?.photoURL || 'guest',
        cart: auth.currentUser ? cart : guestCart
      });

      if (auth.currentUser) {
        clearCart();
      } else {
        clearGuestCart();
      }
      toast.success('We have received your order!');
    } catch (err) {
      console.log(err);
    } finally {
      setIsOrderLoading(false);
    }
  }

  const isConfirmButtonLoading = processing || isOrderLoading;

  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <div className="bg-neutral-100 rounded-lg p-6 w-full">
        <Form {...form}>
          <form className="grid lg:grid-cols-2 gap-x-10" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <ShippingInfo form={form} />
              <h2 className="mt-12 mb-3 text-xl font-medium">Payment</h2>
              <CheckoutForm />
            </div>
            <div>
              <OrderSummaryCheckout isConfirmButtonLoading={isConfirmButtonLoading} />
            </div>
          </form>
        </Form>
      </div>
    </BoxedContent>
  );
}
