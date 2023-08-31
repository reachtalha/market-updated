import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';
import Link from 'next/link';

interface IProfileCard {
  id: string;
  image: string | StaticImageData;
  name: string;
  title: string[];
  bio: string;
}

export default function ExpertCard({ id, image, name, title, bio }: IProfileCard) {
  return (
    <div className="relative min-w-48 h-96 rounded-sm overflow-hidden">
      <Link
        href={`experts/?category=${title?.length > 0 ? title[0] : 'all'}`}
        className="capitalize z-10 text-sm absolute cursor-pointer top-4 left-4 bg-white p-1 px-3 rounded-lg"
      >
        {title && title[0]} Expert
      </Link>
      <Link href={`experts/${id}`} className="cursor-pointer">
        <Image
          src={image}
          height={550}
          width={450}
          className="max-w-96 h-full object-cover"
          alt={name}
        />
        <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/30 to-transparent transition-opacity ease-in duration-300" />
        <div className="z-[2] absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl capitalize tracking-wide truncate font-alpina font-semibold">
            {name}
          </h3>
          <p className="capitalize w-[25ch] truncate">{bio}</p>
        </div>
      </Link>
    </div>
  );
}
