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
const expertsFetchLimit = 11;

const ExpertsLoader = ({ experts, dictionary }: Props) => {
  const [allExperts, setAllExperts] = useState(experts);
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const expertsFetchLimit = 11;

  useEffect(() => {
    setAllExperts(experts);
  }, [experts]);

  useEffect(() => {
    const loadMoreExperts = async () => {
      const lastDoc = allExperts.slice(-1)[0];
      try {
        const response: any = await getExperts(category, sort, lastDoc, expertsFetchLimit);
        setAllExperts((prevExperts: any) => [...prevExperts, ...response]);
      } catch (error) {
        throw new Error();
      }
    };

    if (inView) {
      loadMoreExperts();
    }
  }, [inView, category, sort, allExperts, expertsFetchLimit]);

  return (
    <div>
      <Experts dictionary={dictionary} experts={allExperts} />

      {inView && (
        <div ref={ref}>
          <Loader className="w-full flex items-center justify-center mt-5" />
        </div>
      )}
    </div>
  );
};

export default ExpertsLoader;
