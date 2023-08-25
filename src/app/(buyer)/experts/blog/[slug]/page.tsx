import BoxedContent from '@/components/common/BoxedContent';
import Hero from '@/components/common/Hero';
import { cn } from '@/lib/utils';

export default async function Post({ params }: { params: { slug: string } }){

  return (
    <>
      <Hero
        className={cn("w-full  bg-primary/50 h-[500px] overflow-hidden grid place-content-center gap-3 text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent")}
        img=""
      >
        <div className="block h-fit overflow-y-hidden py-1">
          <h1 className="animate-text text-5xl font-alpina italic font-medium text-center">
            test
          </h1>
        </div>
      </Hero>
      <BoxedContent className="prose lg:prose-xl gap-x-5 py-24">

        <h1>test</h1>
      </BoxedContent>
    </>
  )
}
