'use client';
import React, { useState, useEffect } from 'react';
import Products from '@/components/common/Buyer/For-you/Products';
import Loader from '@/components/common/Loader';
import { useInView } from 'react-intersection-observer';
import { getProducts } from '@/actions/getForYouProducts';
import BoxedContent from '../../BoxedContent';

type Props = {
  products: any;
  categories: any;
};

const Index = ({ products, categories }: Props) => {
  products = JSON.parse(products);
  categories = JSON.parse(categories);
  const [allProducts, setAllProducts] = useState(products);
  const { ref, inView } = useInView();
  let lastDoc = allProducts[allProducts.length - 1];
  const [responseEnded, setResponseEnded] = useState(false);

  const loadMoreExperts = async () => {
    const response: any = await getProducts(categories, lastDoc);

    if (response.length > 0) {
      setAllProducts((prev: any) => [...prev, ...response]);
    }

    if (response.length < 6 || !response) {
      setResponseEnded(true);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreExperts();
    }
  }, [inView]);

  return (
    <BoxedContent className="mt-32">
      <Products products={allProducts} />

      {!allProducts.length ? (
        <div className="w-full flex items-center justify-center text-gray-500 h-96 text-lg">
          <span>No products found for you. Let&apos;s keep searching!</span>
        </div>
      ) : null}

      {responseEnded && (
        <div className="w-full flex items-center justify-center text-gray-500 h-28 text-lg">
          <span>No more products to display</span>
        </div>
      )}
      {allProducts.length > 0 && (
        <div ref={ref}>
          <Loader className="w-full flex items-center justify-center my-5" />
        </div>
      )}
    </BoxedContent>
  );
};

export default Index;
