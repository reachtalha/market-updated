'use client';
import BoxedContent from '@/components/common/BoxedContent';

import { NewUser, columns } from './columns';
import { DataTable } from './data-table';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import { useRole } from '@/hooks/useUserRole';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

async function getData(): Promise<NewUser[]> {
  const querySnapshot = await getDocs(collection(db, 'waiting-list'));

  let data: any = [];

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return data;
}

export default function NewRegisteredUsers() {
  const { logout } = useAuth();
  const { data, error, isLoading } = useSwr('new-registered-users', getData);
  const role = useRole();
  const router = useRouter();
  console.log(role);

  if (!role) {
    return <Loader className="w-screen h-screen flex items-center justify-center" />;
  }

  if (role !== 'superadmin') {
    router.back();
  }
  if (isLoading) {
    return <Loader className="w-screen h-screen flex items-center justify-center" />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <BoxedContent className="flex flex-col gap-x-5 py-10">
      <Button onClick={() => logout()} className="w-20 ms-auto mb-5 hover:bg-red-600 bg-red-500 ">
        Logout
      </Button>
      <DataTable columns={columns} data={data} />
    </BoxedContent>
  );
}
