import BoxedContent from "@/components/common/BoxedContent";
import {twMerge} from "tailwind-merge";

type LatestBlogsSectionProps = {
  title: string
  className?: string
}

export default function LatestBlogsSection({ title, className = '' }: LatestBlogsSectionProps){
  return (
    <BoxedContent className={twMerge(`mb-[8rem]`, className)}>
      <header className="flex justify-between items-center">
        <h3 className="text-3xl">{title}</h3>
        <h3 className="text-3xl">@allorganicsmarket</h3>
      </header>
      <div className="flex gap-10 mt-5">
        <div className="w-[432px] h-[432px] rounded-lg bg-gray-100" />
        <div className="w-[432px] h-[432px] rounded-lg bg-gray-100" />
        <div className="w-[432px] h-[432px] rounded-lg bg-gray-100" />
      </div>
    </BoxedContent>
  )
}