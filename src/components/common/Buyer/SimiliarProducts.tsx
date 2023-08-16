'use client';
import { getDocs, collection, where, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

import useSWR from 'swr';

import ShopCard from '@/components/common/Buyer/Cards/ShopCard';
import Carousel from '@/components/common/Carousel';
import { SwiperSlide } from 'swiper/react';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import ProductCard from './Cards/ProductCard';

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
    slidesPerView: 3,
    spaceBetween: 30
  }
};

type Product = {
  id: string;
  coverImage: string;
  description: string;
  name: string;
  category: string;
  [key: string]: any;
};

const getproducts = async (category: string) => {
  const docRef = await getDocs(
    query(collection(db, 'products'), where('category', '==', `${category}`), limit(6))
  );
  const products: any = [];
  docRef.forEach((d) => {
    products.push({
      id: d.id,
      ...d.data()
    });
  });
  return products as Product[];
};

export default function Similarproducts({
  category,
  currentProduct
}: {
  category: string;
  currentProduct: string;
}) {
  const {
    data: products,
    error,
    isLoading
  } = useSWR<Product[]>(`${category}-similar-product`, () => getproducts(category));

  if (isLoading) {
    return <Loader className="w-full h-96 flex items-center justify-center " />;
  }
  if (error) {
    return <Error className="w-full h-96 flex items-center justify-center " />;
  }

  return (
    <Carousel title="Similar Products" breakpoints={breakpoints}>
      {products?.map((_: any, i: number) => {
        if (_.id === currentProduct) return;
        return (
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
              shop={_.shopName || 'some shop'}
              type={_.type}
            />
          </SwiperSlide>
        );
      })}
    </Carousel>
  );
}
