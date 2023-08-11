import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import OrderDetail from './OrderDetail';
import { auth, db } from '@/lib/firebase/client';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import Title from '@/components/common/Seller/Shared/Title';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';

type Props = {};

const orders = [
  {
    orderId: 'ABC123',
    products: ['iPhone 13 Pro', 'AirPods Pro', 'Apple Watch Series 7'],
    datePlaced: new Date('2023-07-26')
  },
  {
    orderId: 'DEF456',
    products: ['Samsung Galaxy S21', 'Galaxy Buds Pro', 'Samsung Smart TV'],
    datePlaced: new Date('2023-07-25')
  },
  {
    orderId: 'GHI789',
    products: ['Sony PlayStation 5', 'DualSense Wireless Controller', 'FIFA 24'],
    datePlaced: new Date('2023-07-24')
  },
  {
    orderId: 'JKL012',
    products: ['MacBook Pro', 'Magic Mouse 2', 'LG UltraFine 4K Display'],
    datePlaced: new Date('2023-07-23')
  },
  {
    orderId: 'MNO345',
    products: ['Dell XPS 15', 'Dell UltraSharp Monitor', 'Logitech MX Master 3'],
    datePlaced: new Date('2023-07-22')
  }
];

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
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
      placedAt: new Date(data.timeStamp || '8/15/2022'),
      status: data.status || 'pending',
      products: data.items.map((item: any) => {
        return {
          id: item.uid,
          name: item.name,
          price: item.selectedVariant.price,
          unit: item.unit,
          quantity: item.selectedVariant.quantity,
          image: item.coverImage
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

  return (
    <section className="py-10 sm:py-0  w-full flex">
      <div className="px-1 sm:px-5 gap-y-3 w-full md:w-2/5 flex flex-col ">
        <span className="text-primary text-sm sm:text-base font-medium uppercase">My Orders</span>
        {orders &&
          orders.map((order, index) => (
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
          <span className="text-primary text-sm sm:text-base font-medium uppercase">
            Order Details
          </span>
          <OrderDetail order={orders?.filter((order) => order.id === selectedOrder)[0]} />
        </div>
      )}
    </section>
  );
};

export default Index;
