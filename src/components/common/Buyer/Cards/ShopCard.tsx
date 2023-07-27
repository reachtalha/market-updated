import { StaticImageData } from "next/image";

import Image from "@/components/common/FallbackImage";
import { Button } from "@/components/ui/button";

type Props = {
  image: string | StaticImageData;
  shop: string;
  desc: string;
  type: string;
};

const ShopCard = ({
  image,
  shop,
  desc,
  type,
}: Props) => {
  return (
    <div className="h-fit w-full relative">
      <div className='grid drop-shadow-sm'>
        <Image
          src={image}
          className='w-full object-cover object-center'
          alt={shop}
        />
      </div>
      <span className='absolute top-3 text-xs uppercase bg-white left-5 py-1.5 px-6 rounded-lg'>
        {type}
      </span>
      <div className='bottom-0 text-white py-5 px-6 flex justify-between items-start absolute'>
        <div className='flex flex-col gap-y-3'>
          <div className='flex flex-row justify-between items-center flex-wrap'>
            <span className='text-2xl lg:text-3xl font-medium'>{shop}</span>
            <Button size="resp" className='bg-transparent hover:bg-transparent  border rounded-3xl'>
              Explore Shop
            </Button>
          </div>
          <span className='text-sm line-clamp-3 sm:line-clamp-2 md:line-clamp-2 lg:line-clamp-none'>{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
