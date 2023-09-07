'use client';
import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';
import { useInView } from 'react-intersection-observer';
import { getShops } from '@/actions/getShops';
import { useSearchParams } from 'next/navigation';
import Markets from './Markets';
type Props = {
  markets: any;
};

const LoadMore = ({ markets }: Props) => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const [shops, setShops] = useState(markets);
  const [responseEnded, setResponseEnded] = useState(false);
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  const loadMoreShops = async () => {
    const response = await getShops(category, sort, shops[shops.length - 1]);
    if (response.length < 4) setResponseEnded(true);
    setShops((prev: any) => [...prev, ...response]);
  };

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
