import BoxedContent from '@/components/common/BoxedContent';
import { twMerge } from 'tailwind-merge';

type LatestBlogsSectionProps = {
  title: string;
  className?: string;
};

export default function LatestBlogsSection({ title, className = '' }: LatestBlogsSectionProps) {
  return (
    <BoxedContent className={twMerge(`mb-[8rem]`, className)}>
      <header className="flex flex-wrap justify-between items-center mb-3">
        <h3 className="text-lg md:text-3xl">{title}</h3>
        <h3 className="text-lg md:text-3xl">@allorganicsmarket</h3>
      </header>
      <div className="flex flex-col md:flex-row justify-between gap-y-4 md:gap-x-4">
        <div className="w-full h-[200px] md:h-[350px] rounded-lg object-cover bg-gray-100" />
        <div className="w-full h-[200px] md:h-[350px] rounded-lg object-cover bg-gray-100" />
        <div className="w-full h-[200px] md:h-[350px] rounded-lg object-cover bg-gray-100" />
      </div>
    </BoxedContent>
  );
}
