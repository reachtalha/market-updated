'use client';
import Carousel from '@/components/common/Carousel';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { SwiperSlide } from 'swiper/react';
import ImageWithFallback from '../FallbackImage';

export default function Testimonials({ expertsJSON }: { expertsJSON: any }) {
  const experts = JSON.parse(expertsJSON);
  const router = useRouter();

  return (
    <section className="py-16">
      <Carousel title="What Our Experts Say About Us" slidesPerView={1}>
        {experts.map((_: any, i: number) => (
          <SwiperSlide key={i}>
            <div className="flex gap-10 flex-shrink-0 w-full">
              <div className=" rounded-lg relative h-[15rem] min-w-[300px]">
                <ImageWithFallback
                  sizes="100%"
                  src={_.photoURL}
                  alt={_.name}
                  className="w-full rounded-lg  h-full object-cover object-center"
                  fill
                />
              </div>
              <div>
                <h1 className="font-alpina text-5xl font-medium">{_.name}</h1>

                <p className="uppercase font-america text-sm">
                  {_.topics.length > 0 && _.topics[0]}
                </p>

                <p className="font-america text-3xl mt-10">{_.bio}</p>

                <Button
                  onClick={() => router.push('/experts/' + _.id)}
                  className="uppercase rounded-3xl px-8 py-4 mt-12"
                >
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
