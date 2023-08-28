"use client"
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase/client';
import { addDoc, collection } from 'firebase/firestore';
import useSwr from 'swr';
import toast from 'react-hot-toast';

import BoxedContent from '@/components/common/BoxedContent';
import { Skeleton } from '@/components/ui/skeleton';

const fetchCreateBlogPost = async () => {
  return await addDoc(collection(db, "blog-posts" ), {
    title: "",
    content: [],
    coverImage: "",
    thumbnailImage: "",
    status: "Draft",
    userId: auth.currentUser?.uid,
  });
};

export default function NewPost(){
  const router = useRouter();
  const { data, isLoading } = useSwr(
    'new-blog-post',
    () => fetchCreateBlogPost(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    }
  );

  if(!auth.currentUser){
    toast.error("You're not logged in!");
    return router.push('/auth/login');
  }

  if(isLoading){
    return (
      <BoxedContent className="py-24 mt-8">
        <Skeleton className="h-[40px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[120px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[120px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[300px] w-full bg-gray-200" />
      </BoxedContent>
    );
  }

  return router.push(`/experts/blog/${data?.id}`);
}
