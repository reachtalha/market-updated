import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';
import Link from 'next/link';

interface IProfileCard {
  id: string;
  image: string | StaticImageData;
  name: string;
  title: string[];
  bio: string;
  featured?: boolean;
}

export default function ExpertCard({
  id,
  image,
  name,
  title,
  bio,
  featured = false
}: IProfileCard) {
  return (
    <div
      className={`relative
      ${featured ? 'w-full h-full' : 'min-w-48 h-96'}
        hover:scale-[1.03] transition-all duration-300  rounded-sm overflow-hidden`}
    >
      <Link
        href={`experts/?category=${title?.length > 0 ? title[0] : 'all'}`}
        className={`capitalize z-10  absolute  cursor-pointer ${
          featured ? 'top-8 left-8 text-lg' : 'top-4 left-4 text-sm'
        } bg-white p-1 px-3 rounded-lg`}
      >
        {title && title[0]} Expert
      </Link>
      <Link href={`experts/${id}`} className="cursor-pointer">
        <Image
          src={image}
          height={550}
          width={450}
          className={`${featured ? 'w-full' : 'max-w-96 '} h-full object-cover`}
          alt={name}
        />
        <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/30 to-transparent transition-opacity ease-in duration-300" />
        <div
          className={`z-[2] absolute ${
            featured ? 'bottom-8 left-8' : 'bottom-4 left-4'
          } text-white`}
        >
          <h3
            className={`${
              featured ? 'text-3xl' : ' text-2xl'
            } capitalize tracking-wide truncate font-alpina font-semibold`}
          >
            {name}
          </h3>
          <p className="capitalize w-[25ch] truncate">{bio}</p>
        </div>
      </Link>
    </div>
  );
}
