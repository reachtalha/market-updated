import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';
import Link from 'next/link';

type Props = {
  id: string;
  image: string | StaticImageData;
  shop: string;
  desc: string;
  type: string;
};

const ShopCard = ({ id, image, shop, desc, type }: Props) => {
  return (
    <div className="group h-fit w-full relative ">
      <Link
        href={`market/?category=${type}`}
        className="capitalize z-10 text-sm absolute cursor-pointer top-5 left-5 bg-white p-1 px-3 rounded-lg"
      >
        {type}
      </Link>
      <div className="relative h-96 w-full drop-shadow-sm">
        <Image
          src={image}
          className="object-cover"
          alt={shop}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/40 to-transparent transition-opacity ease-in duration-300" />
      <div className="bottom-0 w-full z-[1] text-white py-5 px-6 flex justify-between items-start absolute">
        <div className="flex gap-3 w-full">
          <div className="space-y-1 flex-1">
            <h5 className="text-2xl lg:text-3xl capitalize font-medium">{shop}</h5>
            <p className="text-sm line-clamp-3 sm:line-clamp-2 text-neutral-100 md:line-clamp-2 lg:line-clamp-none">
              {desc}
            </p>
          </div>
          <Link
            href={`/market/${id}`}
            className="bg-transparent hover:bg-neutral-50 duration-300 transition-colors px-5 w-fit h-fit py-2.5 flex items-center hover:text-neutral-900 border rounded-full"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
