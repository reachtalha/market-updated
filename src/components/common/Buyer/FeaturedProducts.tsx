'use client';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/components/common/Carousel';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import product1 from '@/assets/images/product1.webp';
import { collection, getDoc, getDocs, query, doc, limit } from 'firebase/firestore';
import Loader from '@/components/common/Loader';
import { db } from '@/lib/firebase/client';
import useSwr from 'swr';

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

const getProducts: any = async (): Promise<any> => {
  let products: any = [];

  let docRef;

  docRef = await getDocs(query(collection(db, 'products'), limit(6)));

  products = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  products = await Promise.all(
    products.map(async (product: any) => {
      const docRef = await getDoc(doc(db, 'shops', product.shopId));

      if (docRef.exists()) {
        product.shopName = docRef?.data()?.name;
      }

      return product;
    })
  );

  return products;
};

export default function FeaturedProducts() {
  const { data: products, error, isLoading } = useSwr('featuredProducts', getProducts);

  if (isLoading) {
    return <Loader className="w-screen md:w-[80vw] h-96 flex items-center justify-center " />;
  }

  return (
    <Carousel title="Featured Products" breakpoints={featuredProductsBreakpoints}>
      {products.map((_: any, i: number) => (
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
