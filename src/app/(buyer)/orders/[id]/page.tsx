'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase/client';
import { getDoc, doc } from 'firebase/firestore';
import useSwr from 'swr';
import OrderDetail from '@/components/modules/Account/OrderHistory/OrderDetail';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import LeaveReviewModal from '@/components/common/Buyer/LeaveReviewModal';
import Error from '@/components/common/Error';

type Props = {
  params: {
    id: string;
  };
};

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  reviewed: Boolean;
};
type Order = {
  id: string;
  placedAt: Date;
  status: string;
  products: Product[];
  shipping: {
    name: string;
    time: number;
    charges: number;
  };
  customer: {
    name: string;
    email: string;
    address: string;
    image: string;
  };
};

const getOrder = async (id: string) => {
  let order: Order | any = {};

  const orderRef = await getDoc(doc(db, 'orders', id));

  if (orderRef.exists()) {
    const userRef = await getDoc(doc(db, 'users', orderRef.data().userId));
    const data = orderRef.data();
    order = {
      id: orderRef.id,
      placedAt: data.timeStamp.toDate(),
      status: data.status || 'pending',

      products: data.items.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          price: item.selectedVariant.price,
          selectedVariant: item.selectedVariant,
          unit: item.unit,
          quantity: item.quantity,
          image: item.image,
          reviewed: item.reviewed || false
        };
      }),
      shipping: {
        name: data.shippingMethod || 'Express Courier',
        time: data.shippingTime || 1,
        charges: data.shippingCharges || 5.0
      },
      customer: {
        name: userRef.data()?.name,
        email: userRef.data()?.email,
        address: data.shippingAddress.address,
        image: userRef.data()?.photoURL
      }
    };
  }

  return order;
};

const Order = (props: Props) => {
  const router = useRouter();

  const { data, isLoading, error } = useSwr('mobile-orders', () => getOrder(props.params.id));

  if (window.innerWidth > 756) router.push('/account?display=orders');

  if (isLoading) return <Loader className="w-full h-80 flex items-center justify-center" />;
  if (error) return <Error className="mt-20" />;

  return (
    <div className=" w-[90%] m-auto mt-20">
      <div className="flex justify-between items-center mb-5">
        <span>Order Details</span>
        <LeaveReviewModal
          trigger={
            <Button
              variant="outline"
              className="w-full mt-3 md:mt-0 flex items-end border-neutral-900 px-10 text-neutral-900"
            >
              review
            </Button>
          }
          order={data}
        />
      </div>
      <OrderDetail order={data} />
    </div>
  );
};

export default Order;
