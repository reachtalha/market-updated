import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

import BoxedContent from '@/components/common/BoxedContent';

import { cn } from '@/lib/utils';
import type { Image as SanityImage } from 'sanity'
import { getAllPosts } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';

type PostCardProps = {
  title: string
  slug: string
  date: string
  thumbnailImage: SanityImage
}
function PostCard({ title, slug, date, thumbnailImage}: PostCardProps) {
  const thumbnailImageURL = thumbnailImage != null ? urlForImage(thumbnailImage)?.url() : "";

  return (
    <Link href={`/posts/${slug}`} className="p-3 w-full h-[200px] md:h-[350px] grid place-content-center rounded-lg object-cover bg-gray-100">
      <Image className="w-full h-[200px] md:h-[240px] rounded-lg" width={200} height={350} src={thumbnailImageURL} alt={title} />
      <h2 className="font-medium text-primary text-2xl mt-5">
        {title}
      </h2>
      {date != null && <p className="pb-3 text-gray-800">Published at {format(new Date(date), 'dd-MM-yyyy')}</p>}
    </Link>
  )
}

type LatestBlogsSectionProps = {
  title: string;
  className?: string;
};

export default async function LatestBlogsSection({ title, className = '' }: LatestBlogsSectionProps) {
  const posts = await getAllPosts();

  return (
    <BoxedContent className={cn(`mb-[8rem]`, className)}>
      <header className="flex flex-wrap justify-between items-center mb-3">
        <h3 className="text-lg md:text-3xl">{title}</h3>
        <h3 className="text-lg md:text-3xl">@allorganicsmarket</h3>
      </header>
      <div className="flex flex-col md:flex-row justify-between gap-y-4 md:gap-x-4">
        {posts.map((post: any) => (
          <PostCard
            key={post._id}
            title={post.title}
            slug={post.slug}
            date={post?.publishedAt}
            thumbnailImage={post.thumbnailImage}
          />
        ))}
      </div>
    </BoxedContent>
  );
}
