'use client';
import BoxedContent from '@/components/common/BoxedContent';
import Loader from '@/components/common/Loader';
import { useRole } from '@/hooks/useUserRole';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NewRegisteredUsers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout } = useAuth();
  const role = useRole();

  if (!role) {
    return <Loader className="w-screen h-screen flex items-center justify-center" />;
  }

  if (role !== 'admin') {
    router.back();
  }

  return (
    <BoxedContent className="py-10 space-y-6 max-w-[1000px]">
      <h1 className="font-bold text-center text-4xl">Admin View</h1>
      <div className="flex justify-normal items-center">
        <div>
          <h3 className="font-semibold text-2xl">Account Registration Approvals</h3>
          <p>Empower the Right Users, Grant Access Responsibly</p>
        </div>
        <Button onClick={() => logout()} className="w-20 ms-auto mb-5 hover:bg-red-600 bg-red-500 ">
          Logout
        </Button>
      </div>
      {children}
    </BoxedContent>
  );
}
