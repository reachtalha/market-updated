import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
  image: string | StaticImageData;
  shop: string;
  desc: string;
  type: string;
};

const ShopCard = ({ id, image, shop, desc, type }: Props) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/market/${id}`);
  };
  return (
    <div className="group h-fit w-full relative">
      <div className="relative h-96 w-full drop-shadow-sm">
        <Image
          src={image}
          className="object-cover"
          alt={shop}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="transition duration-300 ease-in-out invisible absolute border w-full h-full group-hover:bg-[#171717]/50 z-10 top-0 right-0 group-hover:visible">
        <div className="w-full h-full grid place-content-center">
          <span className="text-2xl mb-3 capitalize text-white md:text-4xl font-alpina font-medium">
            {shop}
          </span>
          <Button
            size="resp"
            onClick={handleRedirect}
            className="bg-transparent hover:bg-transparent  border rounded-3xl"
          >
            Explore Shop
          </Button>
        </div>
      </div>
      <span className="group-hover:hidden absolute top-3 text-xs uppercase bg-white left-5 py-1.5 px-6 rounded-lg">
        {type}
      </span>
      <div className="group-hover:hidden bottom-0 w-full  text-white py-5 px-6 flex justify-between items-start absolute">
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex flex-row   justify-between items-center flex-wrap">
            <span className="text-2xl lg:text-3xl capitalize font-medium">{shop}</span>
            <Button
              size="resp"
              onClick={handleRedirect}
              className="bg-transparent hover:bg-transparent  border rounded-3xl"
            >
              Explore Shop
            </Button>
          </div>
          <span className="text-sm line-clamp-3 sm:line-clamp-2 md:line-clamp-2 lg:line-clamp-none">
            {desc}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
