import React from 'react';
import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';
import { formatCurrency } from '@/utils/formatters';
import Link from 'next/link';

interface ProductCard {
  id: string;
  image: string | StaticImageData;
  shop: string;
  name: string;
  price: number;
  type: string;
  shrink?: boolean;
}

const ProductCard = ({ id, image, shop, name, price, type, shrink = true }: ProductCard) => {
  return (
    <Link href={`/products/${id}`} className={`h-fit relative ${shrink ? '' : 'flex-shrink-0'}`}>
      <div className="relative bg-accent group h-96 w-full drop-shadow-sm">
        <Image
          src={image}
          className="object-cover"
          alt={name}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, (max-width: 1800px) 50vw"
        />
      </div>
      <span className="absolute top-3 text-xs uppercase bg-white left-3 py-1.5 px-6 rounded-lg">
        {type}
      </span>
      <div className="mt-3 flex justify-between items-start">
        <p className="uppercase text-sm tracking-wide">
          <span className="font-alpina italic">{shop} - </span>
          {name}
        </p>
        <p className="text-base font-alpina italic font-medium">{formatCurrency(price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
