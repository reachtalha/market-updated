'use client';
import React, { useState, useEffect } from 'react';
import Experts from '@/components/common/Buyer/Experts/Experts';
import Loader from '@/components/common/Loader';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { getExperts } from '@/actions/getExperts';

type Props = {
  experts: any;
  dictionary: any;
};

const ExpertsLoader = ({ experts, dictionary }: Props) => {
  const [allExperts, setAllExperts] = useState(experts);
  const { ref, inView } = useInView();

  const searchParams = useSearchParams();
  const [responseEnded, setResponseEnded] = useState(false);
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  console.log(allExperts[allExperts.length - 1]);
  const loadMoreShops = async () => {
    const response = await getExperts(category, sort, allExperts[allExperts.length - 1]);
    if (response.length < 3) setResponseEnded(true);
    setAllExperts((prev: any) => [...prev, ...response]);
  };

  useEffect(() => {
    if (inView) {
      loadMoreShops();
    }
  }, [inView]);
  return (
    <div>
      <Experts dictionary={dictionary} experts={allExperts} />

      {responseEnded ? (
        <div className="w-full flex items-cente justify-center text-gray-500 mt-10 text-lg">
          <span>No more experts to display</span>
        </div>
      ) : (
        <div ref={ref}>
          <Loader className="w-full flex items-center justify-center mt-5" />
        </div>
      )}
    </div>
  );
};

export default ExpertsLoader;
