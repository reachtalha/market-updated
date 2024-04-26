import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';
import Link from 'next/link';

interface IProfileCard {
  id: string;
  image: string | StaticImageData;
  name: string;
  title: string[];
  bio: string;
  dictionary: any;
}

export default function ExpertCard({ id, image, name, title, bio, dictionary }: IProfileCard) {
  return (
    <>
      <div className="group h-fit w-full relative hover:scale-105 transition-all duration-300 ease-in-out ">
        <Link
          href={`/experts/?category=${title?.length > 0 ? title[0] : 'all'}`}
          className="capitalize z-10 text-sm absolute cursor-pointer top-5 left-5 bg-white p-1 px-3 rounded-lg"
        >
          {title && title[0]} {dictionary.market.featuredExperts.expertLabel}
        </Link>
        <span className="  absolute  inset-0 z-[1] bg-gradient-to-t from-black/40 to-transparent transition-opacity ease-in duration-300" />
        <div className="relative h-96 w-full   drop-shadow-sm">
          <Image
            src={image}
            height={550}
            width={450}
            className={' w-full h-full object-cover'}
            alt={name}
          />
        </div>
        <div className="bottom-0 w-full z-[1] text-white py-5 px-4 flex justify-between items-start absolute">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between gap-x-2.5">
              <h5 className="text-2xl lg:text-3xl capitalize font-medium truncate">{name}</h5>
              <Link
                href={`experts/${id}`}
                className="bg-transparent hover:bg-neutral-50 duration-300 transition-colors px-3.5 w-fit h-fit py-2 text-sm flex items-center hover:text-neutral-900 border rounded-full"
              >
                {dictionary.market.featuredExperts.exploreExpertBtnLabel}
              </Link>
            </div>
            <p className="text-sm  text-neutral-100 truncate">
              {bio.length > 50 ? bio.slice(0, 50) + '...' : bio}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
