"use client"
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

import BoxedContent from '@/components/common/BoxedContent';

import { db } from '@/lib/firebase/client';
import { cn } from '@/lib/utils';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import useSwr from 'swr';

type PostCardProps = {
  title: string
  slug: string

  thumbnailImage: string
}
function PostCard({ title, slug, thumbnailImage }: PostCardProps) {
  return (
    <Link href={`/post/${slug}`} className="p-3 w-full h-[200px] md:h-[350px] grid place-content-center rounded-lg object-cover bg-gray-100">
      <Image className="w-full h-[200px] md:h-[240px] rounded-lg" width={200} height={350} src={thumbnailImage} alt={title} />
      <h2 className="font-medium text-primary text-2xl mt-5">
        {title}
      </h2>
      {/*{date != null && <p className="pb-3 text-gray-800">Published at {format(new Date(date), 'dd-MM-yyyy')}</p>}*/}
    </Link>
  )
}

type LatestBlogsSectionProps = {
  title: string;
  className?: string;
};

const fetchGetLatestBlogPosts = async () => {
  const q = query(collection(db, "blog-posts"), limit(4));
  const querySnapshot = await getDocs(q);
  let result: any = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result;
}

export default function LatestBlogsSection({ title, className = '' }: LatestBlogsSectionProps) {
  const { data, isLoading } = useSwr(
    'latest-blog-posts',
    fetchGetLatestBlogPosts,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    }
  );

  return (
    <BoxedContent className={cn(`mb-[8rem] mt-8`, className)}>
      <header className="flex flex-wrap justify-between items-center mb-3">
        <h3 className="text-lg md:text-2xl">{title}</h3>
        <h3 className="text-lg md:text-2xl">@allorganicsmarket</h3>
      </header>
      <div className="grid grid-cols-4 justify-between gap-y-4 md:gap-x-4">
        {data?.map((post: any) => (
          <PostCard
            key={post?.id}
            title={post.title}
            slug={post?.id}
            thumbnailImage={post?.thumbnailImage}
          />
        ))}
      </div>
    </BoxedContent>
  );
}
