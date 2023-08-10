'use client';
import { getDocs, collection, where, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

import useSWR from 'swr';

import ShopCard from '@/components/common/Buyer/Cards/ShopCard';
import Carousel from '@/components/common/Carousel';
import { SwiperSlide } from 'swiper/react';

import Loader from '@/components/common/Loader';
import Error from "@/components/common/Error";

const breakpoints = {
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

type Shop = {
    id: string;
    coverImage: string;
    tagline: string;
    name: string;
    category: string;
    [key: string]: any;
};

export default function SimilarShops({ category }: { category: string }) {
    const { data: shops, error, isLoading } = useSWR<Shop[]>(`${category}-similar`, async () => {
        const docRef = await getDocs(query(collection(db, "shops"), where("category", "==", `${category}`), limit(6)))
        const shops: any = [];
        docRef.forEach((d) => {
            shops.push({
                id: d.id,
                ...d.data()
            })
        })
        return shops as Shop[];
    });

    if (isLoading) {
        return <Loader className="w-full h-96 flex items-center justify-center " />;
    }
    if (error) {
        return <Error className="w-full h-96 flex items-center justify-center " />;
    }

    return (
        <Carousel title="Featured Products" breakpoints={breakpoints}>
            {shops?.map((_: any, i: number) => (
                <SwiperSlide key={i + Math.random()}>
                    <ShopCard
                        key={i + Math.random()}
                        image={_.coverImage}
                        desc={_.tagline}
                        shop={_.name}
                        type={_.category}
                    />
                </SwiperSlide>
            ))}
        </Carousel>
    );
}
