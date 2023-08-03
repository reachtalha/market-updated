'use client';

import { useState, useEffect } from 'react';

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
        setRole('user');
      }
    }
    fetchRole();
    return () => {
      isCanceled = true;
    };
  }, []);

  if (role === '') {
    return 'loading';
  }
  return role;
};
