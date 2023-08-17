import Link from 'next/link';
import { allPosts, Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns';

import BoxedContent from '@/components/common/BoxedContent';
import { cn } from '@/lib/utils';

function PostCard(post: Post) {
  return (
    <Link href={post.url} className="p-3 w-full h-[200px] md:h-[350px] grid place-content-center rounded-lg object-cover bg-gray-100">
      <h2 className="font-medium text-primary text-2xl mb-1">
        {post.title}
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </Link>
  )
}

type LatestBlogsSectionProps = {
  title: string;
  className?: string;
};

export default function LatestBlogsSection({ title, className = '' }: LatestBlogsSectionProps) {
  return (
    <BoxedContent className={cn(`mb-[8rem]`, className)}>
      <header className="flex flex-wrap justify-between items-center mb-3">
        <h3 className="text-lg md:text-3xl">{title}</h3>
        <h3 className="text-lg md:text-3xl">@allorganicsmarket</h3>
      </header>
      <div className="flex flex-col md:flex-row justify-between gap-y-4 md:gap-x-4">
        {allPosts.map((post: Post, idx: number) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </BoxedContent>
  );
}
