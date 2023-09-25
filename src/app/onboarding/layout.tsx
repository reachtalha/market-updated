'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import Loader from '@/components/common/Loader';
import { useRole } from '@/hooks/useUserRole';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const role = useRole();
  const router = useRouter();
  if (role === 'superadmin') {
    router.push('/super-admin');
  }
  if (!auth.currentUser) {
    router.back();
    return <Loader className="grid place-content-center h-screen w-screen overflow-hidden" />;
  }
  return (
    <>
      <main className="grid place-content-center min-h-screen w-full">{children}</main>
    </>
  );
};

export default Layout;
