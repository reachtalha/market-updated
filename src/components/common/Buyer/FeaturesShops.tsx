'use client';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/components/common/Carousel';
import ShopCard from './Cards/ShopCard';
import market1 from '@/assets/images/market1.png';

const featuredShopsBreakpoints = {
  768: {
    slidesPerView: 3,
    spaceBetween: 20
  }
};

export default function FeaturesShops() {
  return (
    <Carousel showNavigation={false} breakpoints={featuredShopsBreakpoints}>
      {Array.from('abcfghyu').map((shop, i: number) => (
        <SwiperSlide key={i + Math.random()}>
          <ShopCard
            id={i.toString()}
            key={i + Math.random()}
            image={market1}
            desc="Find harmony with nature as you flow through your practice, surrounded by the pure essence of organic yoga products that honor your well-being and the planet."
            shop="Salt & Stone"
            type="Skin Care"
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
}
