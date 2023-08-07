import React, { useState } from 'react';
import OrderCard from './OrderCard';
import OrderDetail from './OrderDetail';
import Title from '@/components/common/Seller/Shared/Title';

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

const Index = (props: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<string>(orders[0].orderId);
  return (
    <section className="py-10 sm:py-0  w-full flex">
      <div className="px-1 sm:px-5 gap-y-3 w-full md:w-2/5 flex flex-col ">
        <span className="text-primary text-sm sm:text-base font-medium uppercase">My Orders</span>
        {orders.map((order, index) => (
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
          <OrderDetail orderId={selectedOrder} />
        </div>
      )}
    </section>
  );
};

export default Index;
