'use client';
import { ReactNode } from 'react';

import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperProps, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Keyboard } from 'swiper/modules';
import { cn } from '@/lib/utils';

interface ICarousel extends SwiperProps {
  title?: string;
  children: ReactNode;
  showNavigation?: boolean;
}

const SwiperCustomNavigation = () => {
  const swiper = useSwiper();
  return (
    <div className="inline-flex gap-x-2">
      <button
        className={cn("disabled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5", swiper.isBeginning && "border-neutral-400")}
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className={swiper.isBeginning ? 'text-neutral-400' : ''} />
      </button>
      <button
        className={cn("disabled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5", swiper.isEnd && "border-neutral-400")}
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className={swiper.isEnd ? 'text-neutral-400': ''} />
      </button>
    </div>
  );
};

export default function Carousel({ title, showNavigation = true, children, ...props }: ICarousel) {
  return (
    <>
      <Swiper keyboard modules={[Keyboard]} className="container mySwiper" {...props}>
        {children}
        {showNavigation && (
          <div className="border-t-2 border-black pt-8 pb-5 flex items-center justify-between">
            <h3 className="uppercase font-medium text-sm">{title}</h3>
            <SwiperCustomNavigation />
          </div>
        )}
      </Swiper>
    </>
  );
}
