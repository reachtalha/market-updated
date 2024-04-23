'use client';

import { getDoc, doc } from 'firebase/firestore';
import useSWR, { preload } from 'swr';
import { db, auth } from '@/lib/firebase/client';

const getCurrentUser = async () => {
  const docRef = await getDoc(doc(db, 'users', `${auth.currentUser?.uid}`));
  if (!docRef.exists()) {
    return null;
  }

  return {
    id: docRef.id,
    ...docRef.data()
  } as any;
};

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    error
  } = useSWR('currentUser', getCurrentUser, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    keepPreviousData: true
  });

  return {
    user,
    isLoading,
    error
  };
};
