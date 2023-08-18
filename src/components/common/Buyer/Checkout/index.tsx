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
import { addDoc, collection, getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useCartStore from '@/state/useCartStore';
import toast from 'react-hot-toast';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

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
  shops: string[],
  userId: string,
  total: number
) => {
  const ordersRef = collection(db, 'orders');
  await addDoc(ordersRef, {
    userId,
    total,
    shops,
    timeStamp: Timestamp.fromDate(new Date()),
    items: items,
    shippingAddress
  });
};

const decreaseQuantity = async (docId: string, SKUId: string, quantity: number) => {
  const productRef = await getDoc(doc(db, 'products', docId));
  const SKUs = productRef?.data()?.SKU;
  //decrease quantity of selected SKU
  SKUs.map((sku: any) => {
    if (sku.id === SKUId) {
      sku.quantity -= quantity;
    }
  });
  await updateDoc(doc(db, 'products', docId), {
    SKU: SKUs
  });
};

export default function Checkout() {
  const [processing, setProcessing] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useCartStore((state: any) => state);

  const submitPayment = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: DOMAIN + '/account?display=order'
      }
    });

    if (result.error) {
      setProcessing(false);
      throw new Error(`Payment failed: ${result.error.message}`)
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
      phone: ''
    }
  });
  async function onSubmit(values: any) {
    try {
      setIsOrderLoading(true);
      const shops = cart?.items.map((s: any) => {
        return s.shopId;
      })
      const items = cart?.items.map((i: any) => {
        return {
          id: i.docId,
          image: i.image,
          name: i.name,
          quantity: i.quantity,
          shopId: i.shopId,
          unit: i.unit,
          selectedVariant: {
            id: i.selectedVariant.id,
            color: i.selectedVariant.color,
            measurement: i.selectedVariant.measurement,
            price: i.selectedVariant.price,
          }
        }
      })

      await fetchCreateOrder(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          country: values.country || "Pakistan",
          company: values.company,
          apartment: values.apartments || '',
          city: values.city,
          address: values.address
        },
        items,
        shops,
        cart?.userId,
        cart?.summary?.total
      );
      cart.items.map((item: any) => {
        decreaseQuantity(item.docId, item.skuId, item.quantity);
      });
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
