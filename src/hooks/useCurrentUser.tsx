'use client';

import { getDoc, doc } from 'firebase/firestore';
import useSWR from 'swr';
import { db, auth } from '@/lib/firebase/client';

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    error
  } = useSWR('currentUser', async () => {
    const docRef = await getDoc(doc(db, 'users', `${auth.currentUser?.uid}`));
    return {
      is: docRef.id,
      ...docRef.data()
    } as any;
  });

  return {
    user,
    isLoading,
    error
  };
};
