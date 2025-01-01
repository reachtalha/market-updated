import BoxedContent from '@/components/common/BoxedContent';
import Hero from '@/components/common/Hero';
import { cn } from '@/lib/utils';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import edjsHTML from 'editorjs-html';

function linkToolParser(block: any) {
  return `<a href="${block.data.link}" target="_blank" rel="noopener noreferrer">${block.data.link}</a>`;
}

const plugins = {
  linkTool: linkToolParser // Add custom parser for linkTool
};

const edjsParser = edjsHTML(plugins);

const fetchGetBlogPost = async (blogPostId: string) => {
  const docRef = await getDoc(doc(db, 'blog-posts', blogPostId));
  return docRef.data();
};

export async function generateMetadata({ params }: { params: any }) {
  const data = (await fetchGetBlogPost(params.slug)) as any;
  const title = data?.title.charAt(0).toUpperCase() + data?.title.slice(1);
  return {
    title: `${title} - All Organics`
  };
}
export default async function Post({ params }: { params: { slug: string } }) {
  const data = (await fetchGetBlogPost(params.slug)) as any;

  console.log('data - blog - ', data);

  return (
    <>
      <Hero
        className={cn(
          'w-full  bg-primary/50 h-[500px] overflow-hidden grid place-content-center gap-3 text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent'
        )}
        img={data?.coverImage}
      >
        <div className="block h-fit overflow-y-hidden py-1">
          <h1 className="animate-text text-5xl font-alpina italic font-medium text-center">
            {data?.title}
          </h1>
        </div>
      </Hero>
      <BoxedContent className="prose lg:prose-xl gap-x-5 py-24">
        <div className="prose lg:prose-xl pt-16">
          <h1>{data?.title}</h1>
          {data?.content?.blocks.map((block: any, idx: number) => {
            const parsedBlock = edjsParser?.parseBlock(block);

            console.log('parsedBlock - ', parsedBlock);

            return <div key={idx} dangerouslySetInnerHTML={{ __html: parsedBlock }} />;
          })}
        </div>
      </BoxedContent>
    </>
  );
}
