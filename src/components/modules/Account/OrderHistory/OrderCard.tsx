import React from 'react';

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
      className={`border p-5 flex rounded-xl gap-y-2 flex-col w-[50vh] cursor-pointer ${
        selectedOrder === orderId && ' border-2 border-primary'
      }`}
    >
      <span>
        <span className="font-medium">Order ID:</span> {orderId}{' '}
      </span>
      <hr className="border-b-[1px] border-primary" />
      <span className="text-sm">
        {' '}
        <span className="font-medium text-base">Products:</span>{' '}
        {products.map((product) => product + ', ')}{' '}
      </span>
      <hr className="border-b-[1px] border-primary" />
      <span>
        {' '}
        <span className="font-medium">Date Placed:</span> {formatDate(datePlaced)}{' '}
      </span>
    </div>
  );
}

export default OrderCard;
