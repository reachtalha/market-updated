'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useElements, useStripe } from '@stripe/react-stripe-js';

import BoxedContent from '@/components/common/BoxedContent';
import ShippingInfo from '@/components/common/Buyer/Checkout/ShippingInfo';
import OrderSummaryCheckout from '@/components/common/Buyer/Checkout/OrderSummaryCheckout';
import CheckoutForm from '@/components/common/Buyer/Checkout/CheckoutForm';
import { Form } from '@/components/ui/form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useCartStore from '@/state/useCartStore';
import toast from 'react-hot-toast';

const DEV = 'http://localhost:3000/';
const PROD = 'http://marketplace.com/';

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
  // postal: z.string().min(1, { message: "required" }),
  phone: z.string().min(1, { message: 'required' })
});

type ShippingAddressType = {
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

const fetchCreateOrder = async (
  shippingAddress: ShippingAddressType,
  items: ItemsType,
  userId: string,
  total: number
) => {
  const ordersRef = collection(db, 'orders');
  await addDoc(ordersRef, {
    userId,
    total,
    timeStamp: new Date(),
    items: items,
    shippingAddress
  });
};

export default function Checkout() {
  const [processing, setProcessing] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useCartStore((state: any) => state);

  const submitPayment = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: DEV + 'account?display=order'
      }
    });

    if (result.error) {
      setError(`Payment failed: ${result.error.message}`);
      setProcessing(false);
    } else {
      setProcessing(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartments: '',
      city: '',
      state: '',
      // postal: "",
      phone: ''
    }
  });
  console.log(cart);

  async function onSubmit(values: any) {
    try {
      setIsOrderLoading(true);
      await fetchCreateOrder(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          country: values.country || 'Pakistan',
          company: values.company,
          apartment: values.apartments || '',
          city: values.city,
          address: values.address
        },
        cart?.items,
        cart?.userId,
        cart?.summary?.total
      );
      submitPayment();
      clearCart();
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
