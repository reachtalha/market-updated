import Image from 'next/image';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';

import ProductDetailsImg from '@/assets/images/product-details-img.png'

import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductSlider(){
  return <Swiper loop pagination keyboard modules={[Keyboard, Pagination]} className="container mySwiper">
      <SwiperSlide>
        <Image className="w-full h-full" src={ProductDetailsImg} alt="product details" />
      </SwiperSlide>
    <SwiperSlide>
      <Image className="w-full h-full" src={ProductDetailsImg} alt="product details" />
    </SwiperSlide>
    <SwiperSlide>
      <Image className="w-full h-full" src={ProductDetailsImg} alt="product details" />
    </SwiperSlide>
    <SwiperSlide>
      <Image className="w-full h-full" src={ProductDetailsImg} alt="product details" />
    </SwiperSlide>
    <SwiperSlide>
      <Image className="w-full h-full" src={ProductDetailsImg} alt="product details" />
    </SwiperSlide>
    <SwiperSlide>
      <Image className="w-full h-full" src={ProductDetailsImg} alt="product details" />
    </SwiperSlide>
    </Swiper>
}