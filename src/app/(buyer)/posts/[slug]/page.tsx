import { format, parseISO } from 'date-fns'
import BoxedContent from '@/components/common/BoxedContent';
import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks'

// don't change, are used contentlayer
export const generateStaticParams = async () => allPosts.map((post: any) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post: any) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

export default function Post({ params }: { params: { slug: string } }){
  const post = allPosts.find((post: any) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <BoxedContent className="gap-x-5 py-24">
      <article className="prose lg:prose-xl mx-auto">
        <div className="mb-8 text-center">
          <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        {/*<div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />*/}
        <MDXContent />
      </article>
    </BoxedContent>

  )
}