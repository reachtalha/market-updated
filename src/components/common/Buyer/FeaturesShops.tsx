'use client';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/components/common/Carousel';
import ShopCard from './Cards/ShopCard';
import market1 from '@/assets/images/market1.png';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';

const featuredShopsBreakpoints = {
  768: {
    slidesPerView: 3,
    spaceBetween: 20
  }
};

const getShops = async () => {
  let shops: any = [];
  const querySnapshot = await getDocs(collection(db, 'shops'));

  querySnapshot.forEach((doc: any) => {
    shops.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return shops;
};

export default function FeaturesShops() {
  const { data: shops, isLoading } = useSwr('featuresShops', getShops);
  if (isLoading) return <Loader className="w-full flex items-center justify-center" />;
  return (
    <Carousel showNavigation={false} breakpoints={featuredShopsBreakpoints}>
      {shops.map((shop: any, i: number) => (
        <SwiperSlide key={i + Math.random()}>
          <ShopCard
            key={i + Math.random()}
            id={shop.id}
            image={shop.coverImage}
            desc={shop.tagline}
            shop={shop.name}
            type={shop.category}
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
}
