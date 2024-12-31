'use client';

import { useState, useEffect, useMemo } from 'react';
import { auth } from '@/lib/firebase/client';

export const useRole = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    let isCanceled = false;

    async function fetchRole() {
      const idTokenResult = await auth.currentUser?.getIdTokenResult();
      if (!isCanceled && !!idTokenResult?.claims.role) {
        setRole(idTokenResult?.claims.role as string);
      } else {
        setRole('buyer');
      }
    }

    fetchRole();

    return () => {
      isCanceled = true;
    };
  }, []);

  const cachedRole = useMemo(() => role, [role]);
  return cachedRole;
};
