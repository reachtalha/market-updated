import React from "react";
import { StaticImageData } from "next/image";

import Image from "@/components/common/FallbackImage";
import { formatCurrency } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
type Props = {
  image: string | StaticImageData;
  shop: string;
  desc: string;
  type: string;
  shrink?: boolean;
};

const MarketCard = ({
  image,
  shop,
  desc,

  type,
  shrink = true,
}: Props) => {
  return (
    <div className={`h-fitoooo relative ${shrink ? "" : "flex-shrink-0"}`}>
      <div className='h-[300px]sm:[h-430px] grid place-content-center  drop-shadow-sm'>
        <Image
          src={image}
          className=' object-cover object-center opacity-90'
          alt={shop}
        />
      </div>
      <span className='absolute top-3 text-xs uppercase bg-white left-5 py-1.5 px-6 rounded-lg'>
        {type}
      </span>
      <div className='bottom-0 text-white py-5 px-6 flex justify-between items-start absolute'>
        <div className='flex flex-col gap-y-3'>
          <div className='flex flex-row justify-between items-center '>
            <span className='text-3xl font-medium'>{shop}</span>
            <Button className='bg-transparent hover:bg-transparent  border rounded-3xl'>
              Explore Shop
            </Button>
          </div>
          <span className='text-sm'>{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
