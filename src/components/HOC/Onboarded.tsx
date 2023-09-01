'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const Onboarded = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    const redirectToPath = () => {
      if (auth.currentUser && !isLoading && !user) {
        router.replace(`/onboarding/?id=${auth.currentUser.uid}`);
        return;
      }

      switch (user?.role?.toLowerCase()) {
        case 'seller':
          router.replace(`/seller/dashboard`);
          break;
        case 'buyer':
          router.replace(`/`);
          break;
        case 'admin':
          router.replace(`/super-admin`);
          break;
        default:
          router.replace('/');
          break;
      }
    };

    redirectToPath();
  }, [user, isLoading, router]);

  return <>{children}</>;
};

export default Onboarded;
