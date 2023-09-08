'use client';

import { NewUser, columns } from './columns';
import { DataTable } from './data-table';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

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
  const { data, error, isLoading } = useSwr('new-registered-users', getData);
  if (isLoading) {
    return <Loader className="w-full h-[70vh] grid place-content-center" />;
  }

  if (error) {
    return <Error className="w-full h-[50vh] grid place-content-center" />;
  }

  return <DataTable columns={columns} data={data} />;
}
