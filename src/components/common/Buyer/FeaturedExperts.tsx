"use client";
import { SwiperSlide } from "swiper/react";

import Carousel from "@/components/common/Carousel";
import ExpertCard, { Expert } from "@/components/common/Buyer/Cards/ExpertCard";

const experts = [
  {
    name: "Olivia Olivera",
    description:
      "Herbs are for everyone - find the blend that makes your life smoother and easier.",
  },
  {
    name: "Matthew Barnes",
    description:
      "Find harmony with nature as you flow through your practice, surrounded by the pure\n" +
      "essence of organic yoga products that honor your well-being and the planet.",
  },
  {
    name: "Olivia Olivera",
    description:
      "Herbs are for everyone - find the blend that makes your life smoother and easier.",
  },
  {
    name: "Matthew Barnes",
    description:
      "Find harmony with nature as you flow through your practice, surrounded by the pure\n" +
      "essence of organic yoga products that honor your well-being and the planet.",
  },
];

const featuredExpertsBreakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1700: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
};

export default function FeaturedExperts() {
  return (
    <Carousel showNavigation={false} breakpoints={featuredExpertsBreakpoints}>
      {experts.map((expert: Expert, i: number) => (
        <SwiperSlide key={i + Math.random()}>
          <ExpertCard expert={expert} />
        </SwiperSlide>
      ))}
    </Carousel>
  );
}
