'use client';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/components/common/Carousel';
import FeaturedExpertCard, { Expert } from '@/components/common/Buyer/Cards/FeaturedExpertCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSwr from 'swr';

import Loader from '@/components/common/Loader';

const featuredExpertsBreakpoints = {
  768: {
    slidesPerView: 2,
    spaceBetween: 20
  }
};

const getExperts: any = async (): Promise<any> => {
  let experts: any = [];

  const docRef = await getDocs(query(collection(db, 'users'), where('role', '==', 'influencer')));
  experts = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return experts;
};

export default function FeaturedExperts() {
  const { data: experts, isLoading } = useSwr('featuresExperts', getExperts);
  if (isLoading) return <Loader className="w-full flex items-center justify-center" />;

  return (
    <Carousel showNavigation={false} breakpoints={featuredExpertsBreakpoints}>
      {experts.map((expert: Expert, i: number) => (
        <SwiperSlide key={i + Math.random()}>
          <FeaturedExpertCard expert={expert} />
        </SwiperSlide>
      ))}
    </Carousel>
  );
}
