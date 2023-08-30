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
  const querySnapshot = await getDocs(query(collection(db, 'blog-posts'), limit(5)));
  let result: any = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  return result;
};

export default async function OrganicSimplifiedSection() {
  const data = await fetchGetLatestBlogPosts();
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between">
        <p className="text-lg md:text-3xl">#OrganicSimplified</p>

        <p className="text-lg md:text-3xl">@allorganicsmarket</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-4 md:gap-x-4">
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
    </div>
  );
}
