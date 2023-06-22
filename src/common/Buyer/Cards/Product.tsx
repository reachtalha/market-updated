import React from "react";
import { StaticImageData } from "next/image";

import Image from "@/common/FallbackImage";
import { formatCurrency } from "@/utils/formatters";

interface ProductCard {
  image: string | StaticImageData;
  shop: string;
  name: string;
  price: number;
  type: string;
  shrink?: boolean;
}
const Product = ({
  image,
  shop,
  name,
  price,
  type,
  shrink = true,
}: ProductCard) => {
  return (
    <div
      className={`w-[350px] h-fit relative ${shrink ? "" : "flex-shrink-0"}`}
    >
      <div className="w-full h-96 bg-accent drop-shadow-sm">
        <Image
          src={image}
          width={500}
          height={500}
          className="w-full h-full object-cover object-center"
          alt={name}
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
        <p className="text-base font-alpina italic font-medium">
          {formatCurrency(price)}
        </p>
      </div>
    </div>
  );
};

export default Product;
