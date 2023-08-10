import React from 'react';
import OrderDetail from '@/components/modules/Account/OrderHistory/OrderDetail';
import CustomerCard from './CustomerCard';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  params: {
    id: string;
  };
};

const getOrder = async (id: string) => {
  const docRef = await getDoc(doc(db, 'orders', id));
  let data = null;
  let order;
  if (docRef.exists()) {
    const userRef = await getDoc(doc(db, 'users', docRef.data().userId));
    data = docRef.data();
    order = {
      id: docRef.id,
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
  }

  return order;
};
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

const page = async ({ params }: Props) => {
  const order: Order = (await getOrder(params.id)) as Order;

  return (
    <div className="container w-[95%] flex flex-col m-auto lg:w-full font-american px-1 md:px-5 py-10 md:py-20">
      <div className=" w-full flex flex-col-reverse md:flex-row  pr-10 pb-5 md:items-end gap-y-4 md:gap-y-0 justify-between">
        <span className="text-[1.1rem] font-semibold md:text-lg">
          Order: <span className="font-normal">{order.id}</span>
        </span>
        <span className="text-[1.1rem]   md:text-lg">
          <span className="font-semibold">Placed At: </span>
          {order.placedAt.toLocaleDateString()}, {order.placedAt.toLocaleTimeString()}
        </span>
        <div
          className={`capitalize w-28 rounded-3xl   p-2 px-4 flex items-center font-medium justify-center ${
            order?.status.toLowerCase() === 'delivered'
              ? 'bg-green-100 text-green-500'
              : order?.status.toLowerCase() === 'pending'
              ? 'bg-yellow-100 text-yellow-500'
              : 'bg-red-100 text-red-500'
          }`}
        >
          <span>{order.status}</span>
        </div>
      </div>
      <div className=" flex flex-col h-full md:flex-row gap-y-10 md:gap-x-5 ">
        <div className="w-full lg:w-3/5">
          <div>
            <OrderDetail order={order} />
          </div>
        </div>
        <div className="flex flex-col w-full items-start gap-y-2 md:w-2/5 ">
          <CustomerCard {...order.customer} />
        </div>
      </div>
    </div>
  );
};

export default page;
