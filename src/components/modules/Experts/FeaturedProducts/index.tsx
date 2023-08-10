'use client';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/components/common/Carousel';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import { auth } from '@/lib/firebase/client';
import { getDoc, doc } from 'firebase/firestore';
import Loader from '@/components/common/Loader';
import Error from "@/components/common/Error";
import { db } from '@/lib/firebase/client';
import useSWR from 'swr';

const featuredProductsBreakpoints = {
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


const fetchProductDetails = async (productId: string) => {
    const productDoc = await getDoc(doc(db, "products", productId));
    if (!productDoc.exists()) {
        return;
    }
    const productData = productDoc.data();
    const shopDocSnap = await getDoc(doc(db, 'shops', productData.shopId));
    return { id: productDoc.id, ...productData, shopName: shopDocSnap.data()?.name };
};


export default function FeaturedProducts({ list }: { list: string[] }) {
    const { data: products, error, isLoading } = useSWR(`${auth.currentUser?.uid}-featured`, async () => {
        const products = await Promise.all(list.map((id) => fetchProductDetails(id)))
        return products;
    });

    if (isLoading) {
        return <Loader className="w-full h-96 flex items-center justify-center " />;
    }
    if (error) {
        return <Error className="w-full h-96 flex items-center justify-center " />;
    }

    return (
        <Carousel title="Featured Products" breakpoints={featuredProductsBreakpoints}>
            {products?.map((_: any, i: number) => (
                <SwiperSlide key={i + Math.random()}>
                    <ProductCard
                        key={i + Math.random()}
                        id={_.id}
                        image={_.coverImage}
                        name={_.name}
                        price={
                            _.SKU?.length === 1
                                ? _.SKU[0].price
                                : _.SKU.sort((a: any, b: any) => a.price - b.price)[0].price
                        }
                        shop={_.shopName}
                        type={_.type}
                        shrink={false}
                    />
                </SwiperSlide>
            ))}
        </Carousel>
    );
}
