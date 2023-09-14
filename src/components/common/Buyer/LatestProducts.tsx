'use client';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/components/common/Carousel';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import { collection, getDoc, getDocs, query, doc, limit, orderBy } from 'firebase/firestore';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import { db } from '@/lib/firebase/client';
import useSWR from 'swr';

const latestProductsBreakpoints = {
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

const fetchProductDetails = async (product: any) => {
  const shopDocRef = doc(db, 'shops', product.shopId);
  const shopDocSnap = await getDoc(shopDocRef);

  if (shopDocSnap.exists()) {
    return { ...product, shopName: shopDocSnap.data().name };
  }
  return product;
};

const fetchLatestProducts = async () => {
  const productsCollectionRef = collection(db, 'products');
  const productQuery = query(productsCollectionRef, limit(6), orderBy('submittedAt', 'desc'));
  const productQuerySnapshot = await getDocs(productQuery);

  const products: any = [];

  productQuerySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  const productsWithShopNames = await Promise.all(products.map(fetchProductDetails));
  return productsWithShopNames;
};

export default function LatestProducts() {
  const { data: products, error, isLoading } = useSWR('latestProducts', fetchLatestProducts);

  if (isLoading) {
    return <Loader className="w-full h-96 flex items-center justify-center " />;
  }
  if (error) {
    return <Error className="w-full h-96 flex items-center justify-center " />;
  }

  return (
    <Carousel
      navigationClassName="border-t-0"
      title="Latest Products"
      breakpoints={latestProductsBreakpoints}
    >
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
