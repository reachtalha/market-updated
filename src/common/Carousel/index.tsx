"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

interface ICarousel {
  title: string;
  children: any;
}

export default function Carousel({ title, children }: ICarousel) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<any>(null);

  const [minItems, setMinItems] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMinItems(5);
      } else {
        setMinItems(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (carousel?.current) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current =
      carousel.current?.scrollWidth - carousel.current?.offsetWidth ?? 0;
  }, []);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  }, [currentIndex]);

  const next = useCallback(() => {
    if (
      carousel?.current?.offsetWidth * currentIndex <=
      maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  }, [currentIndex, maxScrollWidth]);

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel?.current) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current ||
        children.length <= minItems
      );
    }

    return false;
  };

  return (
    <>
      <div className="border-t-2 mx-10 border-black pt-8 pb-5 flex items-center justify-between">
        <h3 className="uppercase font-medium text-sm">{title}</h3>
        <div className="inline-flex gap-x-2">
          <button
            onClick={prev}
            // disabled={isDisabled("prev")}
            className="disbaled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={next}
            // disabled={isDisabled("next")}
            className="disbaled:opacity-70 disabled:cursor-not-allowed border opacity-100 border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <div
        ref={carousel}
        className="no-scrollbar overflow-auto ml-10 flex gap-x-5 items-start snap-x snap-start "
      >
        {children}
      </div>
    </>
  );
}
