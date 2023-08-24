import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import OrderDetail from './OrderDetail';
import { auth, db } from '@/lib/firebase/client';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import LeaveReviewModal from '@/components/common/Buyer/LeaveReviewModal';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';

type Props = {};

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
  const userId = auth.currentUser?.uid;
  const orders: Order[] = [];

  const querySnapshot = await getDocs(
    query(collection(db, 'orders'), where('userId', '==', userId))
  );
  if (querySnapshot.docs.length < 1) {
    return [];
  }

  const userRef = await getDoc(doc(db, 'users', userId || ''));

  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    const order = {
      id: doc.id,
      placedAt: data.timeStamp.toDate(),
      status: data.status || 'pending',

      products: data.items.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          price: item.selectedVariant.price,
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
    orders.push(order);
  });

  return orders;
};

const Index = (props: Props) => {
  const {
    data: orders,
    error,
    isLoading
  }: {
    data: Order[] | undefined;
    error: any;
    isLoading: boolean;
  } = useSwr('orders', getOrder);
  const [selectedOrder, setSelectedOrder] = useState<string>('');

  useEffect(() => {
    if (orders && orders.length > 0) {
      setSelectedOrder(orders[0].id);
    }
  }, [orders]);

  if (isLoading) {
    return <Loader className="w-full h-64 flex items-center justify-center" />;
  }

  console.log(orders);

  return (
    <section className="py-10 sm:py-0  w-full flex">
      <div className="px-1 sm:px-5 gap-y-3 w-full md:w-2/5 flex flex-col ">
        <span className="text-primary text-sm sm:text-base font-medium uppercase">My Orders</span>
        {orders?.length === 0 && (
          <p className="text-sm 3xl:text-base text-neutral-700 py-[5%]">No Orders found</p>
        )}
        {orders?.map((order, index) => (
          <OrderCard
            {...order}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            key={index}
          />
        ))}
      </div>
      {selectedOrder !== '' && (
        <div className="hidden  sm:relative  sm:flex flex-col gap-3 md:w-3/5">
          <div className="flex flex-row items-center justify-between">
            <span className="text-primary text-sm sm:text-base font-medium uppercase">
              Order Details
            </span>

            <LeaveReviewModal
              trigger={
                <Button
                  variant="outline"
                  className="w-full mt-3 md:mt-0 flex items-end border-neutral-900 px-10 text-neutral-900"
                >
                  review
                </Button>
              }
              order={orders?.filter((order) => order.id === selectedOrder)[0]}
            />
          </div>
          <OrderDetail order={orders?.filter((order) => order.id === selectedOrder)[0]} />
        </div>
      )}
    </section>
  );
};

export default Index;
