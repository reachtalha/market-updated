'use client';
import { ReactNode, useState } from 'react';

import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperProps, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Keyboard } from 'swiper/modules';
import { cn } from '@/lib/utils';

interface ICarousel extends SwiperProps {
  title?: string;
  navigationClassName?: string;
  children: ReactNode;
  showNavigation?: boolean;
}

const SwiperCustomNavigation = ({
  forceRerender,
  setForceRerender
}: {
  forceRerender: any;
  setForceRerender: any;
}) => {
  const swiper = useSwiper();
  return (
    <div className="inline-flex gap-x-2">
      <button
        className={cn(
          'disabled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5',
          swiper.isBeginning && 'border-neutral-400'
        )}
        onClick={() => {
          setForceRerender(!forceRerender);
          swiper.slidePrev();
        }}
      >
        <ChevronLeftIcon className={swiper.isBeginning ? 'text-neutral-400' : ''} />
      </button>
      <button
        className={cn(
          'disabled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5',
          swiper.isEnd && 'border-neutral-400'
        )}
        onClick={() => {
          setForceRerender(!forceRerender);
          swiper.slideNext();
        }}
      >
        <ChevronRightIcon className={swiper.isEnd ? 'text-neutral-400' : ''} />
      </button>
    </div>
  );
};

export default function Carousel({
  title,
  showNavigation = true,
  navigationClassName = '',
  children,
  ...props
}: ICarousel) {
  const [forceRerender, setForceRerender] = useState(false);

  return (
    <>
      <Swiper
        onSlideChange={() => {
          setForceRerender(!forceRerender);
        }}
        keyboard
        modules={[Keyboard]}
        className="container mySwiper"
        {...props}
      >
        {children}
        {showNavigation && (
          <div
            className={cn(
              'border-t-2 border-black pt-8 pb-5 flex items-center justify-between',
              navigationClassName
            )}
          >
            <h3 className="uppercase font-medium text-sm">{title}</h3>
            <SwiperCustomNavigation
              forceRerender={forceRerender}
              setForceRerender={setForceRerender}
            />
          </div>
        )}
      </Swiper>
    </>
  );
}
