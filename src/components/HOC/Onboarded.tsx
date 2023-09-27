'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import useLocale from '@/hooks/useLocale';

const Onboarded = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const locale = useLocale();
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    const redirectToPath = () => {
      if (auth.currentUser && !isLoading && !user) {
        router.replace(`/${locale}/onboarding/?id=${auth.currentUser.uid}`);
        return;
      }

      switch (user?.role?.toLowerCase()) {
        case 'seller':
          router.replace(`/${locale}/seller/dashboard`);
          break;
        case 'buyer':
          router.replace(`/${locale}`);
          break;
        case 'admin':
          router.replace(`/${locale}/super-admin`);
          break;
        default:
          router.replace(`/${locale}`);
          break;
      }
    };

    redirectToPath();
  }, [user, isLoading, router]);

  return <>{children}</>;
};

export default Onboarded;
