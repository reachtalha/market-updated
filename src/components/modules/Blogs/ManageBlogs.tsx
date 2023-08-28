'use client';

import { columns } from './columns';
import { DataTable } from './data-table';

import Link from 'next/link';

import { getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

const ManageBlogs = () => {
  const { data, error, isLoading } = useSwr('new-registered-users', async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'blog-posts'), where('uid', '==', `${auth.currentUser?.uid}`))
    );
    let data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return data;
  });
  if (isLoading) {
    return <Loader className="w-full h-[70vh] grid place-content-center" />;
  }

  if (error) {
    return <Error className="w-full h-[50vh] grid place-content-center" />;
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between w-full">
        <div>
          <h1 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-left">
            Manage Your Blogs
          </h1>
          <p className="text-sm md:text-base 2xl:text-lg w-full mt-2.5 mb-8">
            Your creative space to manage, edit, and share your inspiring blogs with the world.
          </p>
        </div>
        <Link href="/blog/write">
          <Button variant="default">Write New Blog</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ManageBlogs;
