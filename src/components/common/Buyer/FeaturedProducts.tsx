'use client';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/components/common/Carousel';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import product1 from '@/assets/images/product1.webp';

const featuredProductsBreakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  868: {
    slidesPerView: 3,
    spaceBetween: 30
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 30
  }
};

export default function FeaturedProducts() {
  return (
    <Carousel title="Featured Products" breakpoints={featuredProductsBreakpoints}>
      {Array.from('abcfghijk').map((_, i: number) => (
        <SwiperSlide key={i + Math.random()}>
          <ProductCard
            image={product1}
            name="  LIGHTWEIGHT SHEER DAILY SUNSCREEN SPF 40"
            price={23}
            shop="Salt & Stone"
            type="Best Sellers"
            shrink={false}
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
}
