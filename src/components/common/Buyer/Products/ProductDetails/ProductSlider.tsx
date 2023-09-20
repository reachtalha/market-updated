import Image from 'next/image';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';
import { Share2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductSlider({ images }: { images: string[] }) {
  return (
    <Swiper
      loop
      pagination={{ clickable: true }}
      keyboard 
      modules={[Keyboard, Pagination]}
      className="container w-full h-full mySwiper relative"
    >
      <div className="absolute z-10 top-5 right-5">
        <a
          href={`https://web.whatsapp.com/send?text=Check out this amazing product on All Organics ${window.location.href}`}
          data-action="share/whatsapp/share"
          target="_blank"
        >
          <Share2 />
        </a>
      </div>
      {images.map((url: string, index: number) => (
        <SwiperSlide className=" w-full h-full" key={index}>
          <div className="relative w-full rounded-lg overflow-hidden h-[60vh] md:h-full">
            <Image
              sizes="100%"
              className="w-full  h-full object-cover object-center"
              src={url}
              alt="product details"
              fill
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
