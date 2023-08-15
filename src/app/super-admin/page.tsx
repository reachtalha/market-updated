import BoxedContent from '@/components/common/BoxedContent';

import { NewUser, columns } from './columns';
import { DataTable } from './data-table';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export const dynamic = 'force-dynamic'

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

export default async function NewRegisteredUsers() {
  const data = await getData();
  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <DataTable columns={columns} data={data} />
    </BoxedContent>
  );
}
