'use client';

import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase/client';

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, 'users', `${auth.currentUser?.uid}`);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUser({ id: docSnap.id, ...docSnap.data() });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        setUser(null);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    isLoading: loading
  };
};
