'use client';

import useSWR from 'swr';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export interface ICategory {
  id: string;
  image: string;
  name: string;
  lifespan: string;
}

export const useCategories = () => {
  const categoriesRef = collection(db, 'categories');

  const fetcher = async (): Promise<ICategory[]> => {
    const querySnapshot = await getDocs(categoriesRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as ICategory[];
  };

  const { data, error, isLoading } = useSWR<ICategory[]>('categories', fetcher);

  return {
    categories: data,
    isError: error,
    isLoading
  };
};
