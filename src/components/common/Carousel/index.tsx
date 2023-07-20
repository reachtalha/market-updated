"use client";
import {ReactNode} from "react";

import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import {Swiper, SwiperProps, useSwiper} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import {  Keyboard } from 'swiper/modules';

interface ICarousel extends SwiperProps {
  title: string;
  children: ReactNode;
}

const SwiperCustomNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className="inline-flex gap-x-2">
      <button
        className="disbaled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="disbaled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}

export default function Carousel({ title, children, ...props }: ICarousel) {
  return (
    <>
      <Swiper
        {...props}
        keyboard
        slidesOffsetBefore={40}
        modules={[Keyboard]}
        className="mySwiper"
      >
        {children}
        <div className="border-t-2 mx-10 border-black pt-8 pb-5 flex items-center justify-between">
          <h3 className="uppercase font-medium text-sm">{title}</h3>
          <SwiperCustomNavigation />
        </div>
      </Swiper>
    </>
  );
}
