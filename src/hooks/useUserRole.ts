'use client';

import { useState, useEffect, useMemo } from 'react';
import { auth } from '@/lib/firebase/client';

const useAuthToken = () => {
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    let isCanceled = false;

    async function fetchToken() {
      const idTokenResult = await auth.currentUser?.getIdTokenResult();
      if (!isCanceled && !!idTokenResult) {
        setToken(idTokenResult);
      } else {
        setToken(null);
      }
    }

    fetchToken();

    return () => {
      isCanceled = true;
    };
  }, [auth.currentUser]);

  return token;
};

export const useRole = () => {
  const [role, setRole] = useState<string>('');
  const token = useAuthToken();

  useEffect(() => {
    if (!!token?.claims.role) {
      setRole(token.claims.role as string);
    } else {
      setRole('buyer');
    }
  }, [token]);

  const cachedRole = useMemo(() => role, [role]);

  return cachedRole;
};
