"use client"
import BoxedContent from '@/components/common/BoxedContent';
import Hero from '@/components/common/Hero';
import { cn } from '@/lib/utils';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSwr from 'swr';
import edjsHTML from 'editorjs-html';
import { Skeleton } from '@/components/ui/skeleton';

const edjsParser = edjsHTML();
const fetchGetBlogPost = async (blogPostId: string) => {
  const docRef = await getDoc(doc(db, "blog-posts", blogPostId));
  return docRef.data();
};
export default function Post({ params }: { params: { slug: string } }){
  const { data, isLoading } = useSwr(
    'view-existing-blog-post',
    () => fetchGetBlogPost(params.slug),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    }
  )

  if(isLoading){
    return (
      <BoxedContent className="py-24 mt-8">
        <Skeleton className="h-[200px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[400px] w-full bg-gray-200" />
      </BoxedContent>
    );
  }

  return (
    <>
      <Hero
        className={cn("w-full  bg-primary/50 h-[500px] overflow-hidden grid place-content-center gap-3 text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent")}
        img={data?.coverImage}
      >
        <div className="block h-fit overflow-y-hidden py-1">
          <h1 className="animate-text text-5xl font-alpina italic font-medium text-center">
            {data?.title}
          </h1>
        </div>
      </Hero>
      <BoxedContent className="prose lg:prose-xl gap-x-5 py-24 mt-8">
        <div className="prose lg:prose-xl pt-16">
          <h1>{data?.title}</h1>
          {data?.content?.blocks.map((block: any, idx: number) => {
            const parsedBlock = edjsParser?.parseBlock(block);
            return <div key={idx} dangerouslySetInnerHTML={{ __html: parsedBlock }} />;
          })}
        </div>
      </BoxedContent>
    </>
  )
}
