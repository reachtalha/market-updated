'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRole } from '@/hooks/useUserRole';

const Onboarded = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  if (auth.currentUser && !isLoading && !user) {
    router.push(`/onboarding/?id=${auth.currentUser.uid}`);
  }

  return <>{children}</>;
};

export default Onboarded;
