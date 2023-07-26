import React from "react";
import { StaticImageData } from "next/image";

import Image from "@/components/common/FallbackImage";
import product1 from "@/assets/images/product1.webp";
type Props = {
  orderId: string;
};

type OrderDetailProps = {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  isShipping?: boolean;
  price: number;
};
const OrderDetailCard = ({
  isShipping,
  title,
  subtitle,
  price,
  image,
}: OrderDetailProps) => {
  return (
    <div className='flex flex-row justify-between w-full items-center'>
      <div className='flex flex-row items-center'>
        <Image
          src={image}
          className={`${isShipping ? " w-20" : " w-32"} object-contain`}
          alt={"product"}
        />
        <div className='flex flex-col gap-y-2'>
          <span
            className={`uppercase font-medium ${
              isShipping ? "text-xs " : "text-sm"
            }`}
          >
            {title}
          </span>
          <span
            className={` ${
              !isShipping && "  uppercase"
            }  text-xs text-gray-600 font-medium`}
          >
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
    <div className='flex flex-row items-center justify-between'>
      <span>{title}</span>
      <span>
        <span className='font-medium'>$</span> {amount}
      </span>
    </div>
  );
};

const OrderDetail = ({ orderId }: Props) => {
  return (
    <div className='sticky flex flex-col gap-y-5 top-24 w-full '>
      <div className='border border-gray-400 rounded-xl w-[50vw] flex flex-col p-5'>
        <span className='font-medium uppercase'>Products</span>
        <OrderDetailCard
          title={"Natural deodrant trio"}
          subtitle={"2.6 oz / 75 G"}
          price={54.0}
          image={product1}
        />
      </div>
      <div className='flex flex-row gap-x-5'>
        <div className='border rounded-xl p-5 w-full gap-y-2 flex flex-col border-gray-400'>
          <span className='font-medium uppercase'>Summary</span>
          <SummaryItem title='Subtotal' amount={54.0} />
          <SummaryItem title='Shipping' amount={9.99} />
          <hr />
          <SummaryItem title='Total' amount={63.99} />
        </div>
        <div className='border border-gray-400 w-full rounded-xl p-5'>
          <span className='uppercase font-medium'>Shipping</span>
          <OrderDetailCard
            title={"TNT Delivery"}
            subtitle={"Delivery within 1 Business Day"}
            price={9.99}
            image={product1}
            isShipping
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
