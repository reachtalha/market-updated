import React from 'react';
import Image from '@/components/common/FallbackImage';

import image from "@/assets/images/market1.png"

type Props = {
  orderId: string;
  products: string[];
  datePlaced: Date;
  selectedOrder: string;
  setSelectedOrder: React.Dispatch<React.SetStateAction<string>>;
};
const formatDate = (date: Date) => {
  const options: any = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
};

function OrderCard({ orderId, products, datePlaced, setSelectedOrder, selectedOrder }: Props) {
  return (
    <div
      onClick={() => setSelectedOrder(orderId)}
      className={`border p-5 flex rounded-xl gap-y-2 flex-col  cursor-pointer ${selectedOrder === orderId && ' border-2 border-primary'
        }`}
    >
      <span>
        <span className="font-medium">Order ID:</span> {orderId}
      </span>
      <hr className="border-b-[1px] border-neutral-100" />
      <span className="text-sm">
        <h6 className="font-medium text-base">Products:</h6>
        <ul className="space-y-1 mt-1">
          {products.map((product) => (
            <li key={product} className='flex gap-x-2 items-center'>
              <Image src={image} height={100} width={100} className="object-cover w-8 h-8 rounded-sm" alt="" />
              {product}
            </li>
          ))}

        </ul>
      </span>
      <hr className="border-b-[1px] border-neutral-100" />
      <span>
        <span className="font-medium">Date Placed:</span> {formatDate(datePlaced)}
      </span>
    </div>
  );
}

export default OrderCard;
