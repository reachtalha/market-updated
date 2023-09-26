'use client';
import React, { useState, useEffect } from 'react';
import Products from '@/components/common/Buyer/For-you/Products';
import Loader from '@/components/common/Loader';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/actions/getForYouProducts';

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
    <div className="w-full">
      <Products products={allProducts} />

      {responseEnded ? (
        <div className="w-full flex items-cente justify-center text-gray-500 my-10 text-lg">
          <span>No more experts to display</span>
        </div>
      ) : (
        <div ref={ref}>
          <Loader className="w-full flex items-center justify-center my-5" />
        </div>
      )}
    </div>
  );
};

export default Index;
