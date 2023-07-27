'use client';
import Carousel from '@/components/common/Carousel';
import { Button } from '@/components/ui/button';
import { SwiperSlide } from 'swiper/react';

export default function Testimonials() {
  return (
    <section className="py-16">
      <Carousel title="What Our Experts Say About Us" slidesPerView={1}>
        {Array.from([1, 2, 3, 4]).map((_, i: number) => (
          <SwiperSlide key={i}>
            <div className="flex gap-10 flex-shrink-0 w-full">
              <div className="w-full rounded-lg bg-gray-100" />
              <div>
                <h1 className="font-alpina text-5xl font-medium">Iris Hadi</h1>
                <p className="uppercase font-america text-sm">Skin Care</p>

                <p className="font-america text-3xl mt-10">
                  I love Salt & Stone. Each product is a careful blend of antioxidant and nutrient
                  rich ingredients--including seaweed, spirulina, kelp-created to protect, cleanse,
                  support and recover. It’s perfect for active living.
                </p>

                <Button className="uppercase rounded-3xl px-8 py-4 mt-12">
                  See More on My Page
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </section>
  );
}
