"use client"
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

import BoxedContent from '@/components/common/BoxedContent';
import NewBlogForm from '@/components/common/Blog/NewBlogForm';
import useSwr from 'swr';
import { Skeleton } from '@/components/ui/skeleton';

const fetchGetBlogPost = async (blogPostId: string) => {

  const docRef = await getDoc(doc(db, "blog-posts", blogPostId));
  return docRef.data();
};

export default function NewPost({ params }: { params: { slug: string }}){
  const { data, isLoading } = useSwr(
    'existing-blog-post',
    () => fetchGetBlogPost(params.slug),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    }
  );

  if(isLoading){
    return (
      <BoxedContent className="py-24">
        <Skeleton className="h-[40px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[120px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[120px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[300px] w-full bg-gray-200" />
      </BoxedContent>
    );
  }

  return (
    <BoxedContent className="py-24">
      <NewBlogForm slug={params?.slug} blogData={{
        title: data?.title,
        content: data?.content,
        coverImage: data?.coverImage || "",
        thumbnailImage: data?.thumbnailImage || "",
        status: data?.status,
      }} />
    </BoxedContent>
  )
}
