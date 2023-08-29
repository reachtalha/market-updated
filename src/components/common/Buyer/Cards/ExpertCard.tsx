import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';

interface IProfileCard {
  image: string | StaticImageData;
  name: string;
  title: string;
  bio: string;
}

export default function ExpertCard({ image, name, title, bio }: IProfileCard) {
  return (
    <div
      key={Math.random() + Date.now()}
      className="relative min-w-48 h-96 rounded-sm overflow-hidden"
    >
      <Image
        src={image}
        height={550}
        width={450}
        className="max-w-96 h-full object-cover"
        alt={name}
      />
      <span className="capitalize text-sm absolute top-5 left-5 bg-white p-1 px-3 rounded-lg">
        {title && title[0]} Expert
      </span>
      <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/30 to-transparent transition-opacity ease-in duration-300" />
      <div className="z-[2] absolute bottom-4 left-4 text-white w-66">
        <h3 className="text-2xl capitalize tracking-wide truncate font-alpina font-semibold">
          {name}
        </h3>
        <p className="capitalize w-[25ch] truncate">{bio}</p>
      </div>
    </div>
  );
}
