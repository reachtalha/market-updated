import React from 'react';
import OrderDetail from '@/components/modules/Account/OrderHistory/OrderDetail';
import CustomerCard from './CustomerCard';

type Props = {
  params: {
    id: string;
  };
};

const Orders = [
  {
    id: '12345678323234241241',
    placedAt: new Date('12/7/2020'),
    status: 'pending',
    products: [
      {
        id: '12345678323234241241',
        name: 'Skin Care',
        price: 100,
        unit: '100 gm',
        quantity: 1,
        image:
          'https://plus.unsplash.com/premium_photo-1675431443027-ad1f46c93c8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80'
      },
      {
        id: '12345678323234241241',
        name: 'Sneakers',
        price: 240,
        unit: 'pair',
        quantity: 3,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      }
    ],
    shipping: {
      name: 'TNT Delivery',
      time: 2,
      charges: 3.5
    },
    customer: {
      name: 'John Doe',
      email: 'john@email.com',
      address: '123 Main St',
      image:
        'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-design-icon-vector-35850819.jpg'
    }
  },
  {
    id: '98765432109876543210',
    placedAt: new Date('8/15/2022'),
    status: 'delivered',
    products: [
      {
        id: '98765432109876543210',
        name: 'Laptop',
        price: 1200,
        unit: '1 unit',
        quantity: 2,
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
      },
      {
        id: '98765432109876543210',
        name: 'Headphones',
        price: 80,
        unit: '1 pair',
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      }
    ],
    shipping: {
      name: 'Express Courier',
      time: 1,
      charges: 5.0
    },
    customer: {
      name: 'Jane Smith',
      email: 'jane@email.com',
      address: '456 Park Ave',
      image:
        'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-design-icon-vector-35850819.jpg'
    }
  }
];

const page = ({ params }: Props) => {
  const order = Orders[parseInt(params.id) - 1 || 0];
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
            <OrderDetail orderId={params.id} order={order} />
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
