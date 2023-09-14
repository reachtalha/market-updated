import React from 'react';
import { StaticImageData } from 'next/image';

import Link from 'next/link';
import Image from '@/components/common/FallbackImage';
import { formatCurrency } from '@/utils/formatters';
import product1 from '@/assets/images/product1.webp';

type Props = {
  order: any;
  dictionary: any;
};

type OrderDetailProps = {
  image: string | StaticImageData;
  title: string;
  unit: string;
  measurement?: string | number;
  isShipping?: boolean;
  price: number;
  id?: string | number;
};
const OrderDetailCard = ({
  id,
  isShipping,
  title,
  unit,
  measurement,
  price,
  image
}: OrderDetailProps) => {
  return (
    <div className="flex font-america flex-row justify-between mt-2 w-full items-center">
      <Link
        href={isShipping ? '' : `/products/${id}`}
        className={`flex flex-row  gap-x-2 items-center ${!isShipping && 'cursor-pointer'}`}
      >
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
            {unit}: {measurement}
          </span>
        </div>
      </Link>
      <span>{formatCurrency(price)}</span>
    </div>
  );
};

const SummaryItem = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <span>{title}</span>
      <span>{formatCurrency(amount)}</span>
    </div>
  );
};

const OrderDetail = ({ order, dictionary }: Props) => {
  const getSubtotal = () => {
    return order.products.reduce((acc: any, curr: any) => acc + curr.price * curr.quantity, 0);
  };
  const getTotal = () => {
    return getSubtotal() + order?.shipping.charges;
  };

  return (
    <div className="sticky flex flex-col gap-y-5 top-24 w-full  ">
      <div className="border border-gray-400 rounded-xl flex flex-col p-5">
        <span className="font-medium uppercase">{dictionary.productsLabel}</span>
        {order.products.map((p: any, index: number) => (
          <OrderDetailCard
            key={index}
            id={p.id}
            title={p.name}
            unit={p.unit}
            measurement={p?.selectedVariant?.measurement}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-y-5 md:gap-x-5">
        <div className="border rounded-xl p-5 w-full gap-y-2 flex flex-col border-gray-400">
          <span className="font-medium uppercase">{dictionary.summaryLabel}</span>

          <SummaryItem title={dictionary.subTotalLabel} amount={getSubtotal().toFixed(2)} />
          <SummaryItem title={dictionary.shippingLabel} amount={order?.shipping.charges} />
          <hr />
          <SummaryItem title={dictionary.totalLabel} amount={getTotal().toFixed(2)} />
        </div>
        <div className="border border-gray-400 w-full rounded-xl p-5">
          <span className="uppercase font-medium">{dictionary.shippingLabel}</span>
          <OrderDetailCard
            title={order?.shipping.name || 'Standard'}
            unit={`Delivery within ${order?.shipping.days} days`}
            price={order?.shipping.charges}
            image={product1}
            isShipping
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
