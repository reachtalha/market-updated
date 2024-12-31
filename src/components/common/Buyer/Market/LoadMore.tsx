'use client';
import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';
import { getShops } from '@/actions/getShops';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import Markets from './Markets';
type Props = {
  markets: any;
};

const loadMoreMarketsLimit = 10;

const LoadMore = ({ markets }: Props) => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const [shops, setShops] = useState(markets);
  const [loading, setLoading] = useState(false);
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    setShops(markets);
  }, [markets]);

  useEffect(() => {
    let lastDoc = shops[shops.length - 1];

    const loadMoreShops = async () => {
      try {
        setLoading(true);
        const response: any = await getShops(category, sort, lastDoc, loadMoreMarketsLimit);
        if (response.length > 0) {
          lastDoc = response[response.length - 1];
          setShops((prevShops: any) => [...prevShops, ...response]);
        }
      } catch (error) {
        throw new Error();
      } finally {
        setLoading(false);
      }
    };

    if (inView && shops.length < markets.length) {
      loadMoreShops();
    }
  }, [inView]);

  return (
    <div>
      <Markets markets={shops} />

      {loading && (
        <div ref={ref}>
          <Loader className="w-full flex items-center justify-center mt-5" />
        </div>
      )}
    </div>
  );
};

export default LoadMore;
