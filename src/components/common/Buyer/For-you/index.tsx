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
  const [loading, setLoading] = useState(false);

  const loadMoreExperts = async () => {
    try {
      setLoading(true);
      const response: any = await getProducts(categories, lastDoc);

      if (response.length > 0) {
        setAllProducts((prev: any) => [...prev, ...response]);
      }

      if (response.length < 6 || !response) {
        setResponseEnded(true);
      }
    } catch (e) {
      throw new Error();
    } finally {
      setLoading(false);
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

      {loading && <Loader className="w-full flex items-center justify-center my-5" />}

      {responseEnded && (
        <div className="w-full flex items-center justify-center text-gray-500 h-28 text-lg">
          <span>No more products to display</span>
        </div>
      )}
      <div ref={ref} />
    </BoxedContent>
  );
};

export default Index;
