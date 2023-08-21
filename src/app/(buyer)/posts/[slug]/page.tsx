import BoxedContent from '@/components/common/BoxedContent';
import { getPostBySlug } from '../../../../../sanity/lib/client';
import {
  PortableText,
  type PortableTextReactComponents,

} from '@portabletext/react'
import { SanityImage } from '@/components/common/SanityImage';
import { urlForImage } from '../../../../../sanity/lib/image';
import Hero from '@/components/common/Hero';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { format } from 'date-fns';

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default async function Post({ params }: { params: { slug: string } }){
  const post = await getPostBySlug(params.slug);
  const postURL = post?.mainImage != null ? urlForImage(post?.mainImage)?.url() : "";
  const postAuthorImageURL = post?.author?.image != null ? urlForImage(post?.author?.image)?.url() : "";

  return (
    <>
      <Hero
        className={cn("w-full  bg-primary/50 h-[500px] overflow-hidden grid place-content-center gap-3 text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent", post?.mainImage == null && "bg-primary")}
        img={postURL}
      >
        <div className="block h-fit overflow-y-hidden py-1">
          <h1 className="animate-text text-5xl font-alpina italic font-medium text-center">
            {post.title}
          </h1>
        </div>
      </Hero>
      <BoxedContent className="prose lg:prose-xl gap-x-5 py-24">
        {post?.author != null && <div className="flex gap-4 items-center">
          <Image className="rounded-full h-[50px] w-[50px]"  height={50} width={50} src={postAuthorImageURL} alt={post.author.name} />
          <p className="font-medium">{post.author.name}</p>
        </div>}
        <h1>{post.title}</h1>
        <PortableText value={post.body} components={myPortableTextComponents} />
      </BoxedContent>
    </>
  )
}