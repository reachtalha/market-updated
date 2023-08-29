import BoxedContent from '@/components/common/BoxedContent';
import BlogCard from '@/components/common/Buyer/Cards/BlogCard';

import { db } from '@/lib/firebase/client';
import { cn } from '@/lib/utils';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

type LatestBlogsSectionProps = {
  title: string;
  className?: string;
  uid?: string;
};

const fetchGetLatestBlogPosts = async (uid?: string) => {
  const q = query(collection(db, 'blog-posts'), where('uid', '==', `${uid}`));
  const querySnapshot = await getDocs(q);
  let result: any = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  return result;
};

export default async function LatestBlogsSection({
  uid,
  title,
  className = ''
}: LatestBlogsSectionProps) {
  const data = await fetchGetLatestBlogPosts(uid);

  return (
    <BoxedContent className={cn(`mb-[8rem]`, className)}>
      <header className="flex flex-wrap justify-between items-center pt-8 pb-5">
        <h3 className="uppercase font-medium text-sm">{title}</h3>
        <h3 className="font-medium text-lg">@allorganicsmarket</h3>
      </header>
      <div>{data?.length === 0 && <p className="py-16 text-center">No Blogs Found</p>}</div>
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
        {data?.map((post: any) => (
          <BlogCard
            key={post?.id}
            title={post.title}
            slug={post?.id}
            postedAt={post?.postedAt}
            thumbnailImage={post?.thumbnailImage}
          />
        ))}
      </div>
    </BoxedContent>
  );
}
