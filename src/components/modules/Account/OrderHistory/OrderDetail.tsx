import React from 'react';
import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';
import product1 from '@/assets/images/product1.webp';
type Props = {
  orderId: string;
  order?: any;
};

type OrderDetailProps = {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  isShipping?: boolean;
  price: number;
};
const OrderDetailCard = ({ isShipping, title, subtitle, price, image }: OrderDetailProps) => {
  return (
    <div className="flex font-america flex-row justify-between mt-2 w-full items-center">
      <div className="flex flex-row  gap-x-2 items-center">
        <Image
          src={image}
          className={`${isShipping ? ' w-20 h-28' : ' w-28 h-24'} object-cover rounded-lg`}
          alt={'product'}
          width={isShipping ? 80 : 100}
          height={isShipping ? 80 : 100}
        />
        <div className="flex flex-col gap-y-2">
          <span className={`uppercase font-medium ${isShipping ? 'text-xs ' : 'text-sm'}`}>
            {title}
          </span>

          <span className={` ${!isShipping && '  uppercase'}  text-xs text-gray-600 font-medium`}>
            {subtitle}
          </span>
        </div>
      </div>
      <span>$ {price}</span>
    </div>
  );
};

const SummaryItem = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <span>{title}</span>
      <span>
        <span className="font-medium">$</span> {amount}
      </span>
    </div>
  );
};

const OrderDetail = ({ orderId, order }: Props) => {
  const getSubtotal = () => {
    if (order) {
      return order.products.reduce((acc: any, curr: any) => acc + curr.price * curr.quantity, 0);
    } else {
      return 54.0;
    }
  };
  const getTotal = () => {
    return getSubtotal() + (order?.shipping.charges || 9.99);
  };
  return (
    <div className="sticky flex flex-col gap-y-5 top-24 w-full ">
      <div className="border border-gray-400 rounded-xl w-[50vw] flex flex-col p-5">
        <span className="font-medium uppercase">Products</span>
        {order ? (
          order.products.map((p: any, index: number) => (
            <OrderDetailCard
              key={index}
              title={p.name}
              subtitle={p.unit}
              price={p.price}
              image={p.image}
            />
          ))
        ) : (
          <OrderDetailCard
            title={'Natural deodrant trio'}
            subtitle={'2.6 oz / 75 G'}
            price={54.0}
            image={product1}
          />
        )}
      </div>
      <div className="flex flex-row gap-x-5">
        <div className="border rounded-xl p-5 w-full gap-y-2 flex flex-col border-gray-400">
          <span className="font-medium uppercase">Summary</span>

          <SummaryItem title="Subtotal" amount={getSubtotal().toFixed(2)} />
          <SummaryItem title="Shipping" amount={order?.shipping.charges || 9.99} />
          <hr />
          <SummaryItem title="Total" amount={getTotal().toFixed(2)} />
        </div>
        <div className="border border-gray-400 w-full rounded-xl p-5">
          <span className="uppercase font-medium">Shipping</span>
          <OrderDetailCard
            title={order?.shipping.name || 'TNT Delivery'}
            subtitle={`Delivery within ${order?.shipping.days || 3} days`}
            price={order?.shipping.charges || 9.99}
            image={product1}
            isShipping
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
