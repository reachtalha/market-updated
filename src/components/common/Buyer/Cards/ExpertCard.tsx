import { StaticImageData } from 'next/image';

import Image from '@/components/common/FallbackImage';

interface IProfileCard {
  image: string | StaticImageData;
  name: string;
  title: string;
}

export default function ExpertCard({ image, name, title }: IProfileCard) {
  return (
    <div
      key={Math.random() + Date.now()}
      className="relative min-w-48 max-h-80 rounded-xl overflow-hidden"
    >
      <Image
        src={image}
        height={500}
        width={450}
        className="w-full h-full object-cover object-center"
        alt={name}
      />
      <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/30 to-transparent transition-opacity ease-in duration-300" />
      <div className="z-[2] absolute bottom-4 left-4 text-white">
        <h3 className="text-2xl tracking-wide truncate font-alpina font-semibold">{name}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}
