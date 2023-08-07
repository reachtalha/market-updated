import BoxedContent from '@/components/common/BoxedContent';

import { NewUser, columns } from './columns';
import { DataTable } from './data-table';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

async function getData(): Promise<NewUser[]> {
  const querySnapshot = await getDocs(collection(db, 'waiting-list'));

  let data: any = [];

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      socials: doc
        .data()
        .socials?.map((social: any) => social.url.length > 0 && social.url)
        .join(', '),
      bio: doc.data().bio
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
