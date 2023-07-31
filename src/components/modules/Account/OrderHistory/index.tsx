import React, { useState } from 'react';
import OrderCard from './OrderCard';
import OrderDetail from './OrderDetail';

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
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  return (
    <>
      <div className="px-5 gap-y-3 flex flex-col ">
        <span className="text-primary font-medium uppercase">My Orders</span>
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
        <div className=" relative  flex flex-col gap-3">
          <span className="text-primary font-medium uppercase">Order Details</span>
          <OrderDetail orderId={selectedOrder} />
        </div>
      )}
    </>
  );
};

export default Index;
