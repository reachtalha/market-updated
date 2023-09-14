import BoxedContent from '@/components/common/BoxedContent';
import BlogCard from '@/components/common/Buyer/Cards/BlogCard';

import { db } from '@/lib/firebase/client';
import { cn } from '@/lib/utils';
import { collection, getDocs, limit, query } from 'firebase/firestore';

type LatestBlogsSectionProps = {
  title: string;
  className?: string;
  uid: string;
};

const fetchGetLatestBlogPosts = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'blog-posts'), limit(3)));
  let result: any = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  return result;
};

export default async function OrganicSimplifiedSection({
  title,
  tag
}: {
  title: string;
  tag: string;
}) {
  const data = await fetchGetLatestBlogPosts();
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between">
        <p className="text-lg md:text-3xl">{title}</p>

        <p className="text-lg md:text-3xl">{tag}</p>
      </div>
      {data?.length === 0 ? (
        <p className="text-center py-14">No Blogs Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
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
      )}
    </div>
  );
}
