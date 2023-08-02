import Image from 'next/image';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';

import ProductDetailsImg from '@/assets/images/product-details-img.png';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductSlider({ images }: { images: string[] }) {
  return (
    <Swiper
      loop
      pagination
      keyboard
      modules={[Keyboard, Pagination]}
      className="container h-full mySwiper"
    >
      {images.map((url: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            className="w-full h-full"
            width={250}
            height={300}
            src={url}
            alt="product details"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
