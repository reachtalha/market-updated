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

const LoadMore = ({ markets }: Props) => {
  const { ref, inView } = useInView();

  const searchParams = useSearchParams();
  const [shops, setShops] = useState(markets);
  const [responseEnded, setResponseEnded] = useState(false);

  let lastDoc = markets[markets.length - 1];
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  const loadMoreShops = async () => {
    try {
      console.log(responseEnded);
      const response: any = await getShops(category, sort, lastDoc);
      if (response.length > 0) {
        lastDoc = response[response.length - 1];
        setShops((prev: any) => [...prev, ...response]);
      }
      if (response.length < 4) setResponseEnded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShops(markets);
    lastDoc = markets[markets.length - 1];
    setResponseEnded(false);
  }, [markets]);

  useEffect(() => {
    if (inView) {
      loadMoreShops();
    }
  }, [inView]);

  return (
    <div>
      <Markets markets={shops} />

      {responseEnded ? (
        <div className="w-full flex items-cente justify-center text-gray-500 mt-10 text-lg">
          <span>No more shops to display</span>
        </div>
      ) : (
        <div ref={ref}>
          <Loader className="w-full flex items-center justify-center mt-5" />
        </div>
      )}
    </div>
  );
};

export default LoadMore;
