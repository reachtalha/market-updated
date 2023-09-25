import BoxedContent from '@/components/common/BoxedContent';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <BoxedContent className="py-24 max-w-[800px]">
      <Skeleton className="h-[40px] w-full bg-gray-200" />
      <div className="flex gap-x-4">
        <Skeleton className="mt-4 h-[120px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[120px] w-full bg-gray-200" />
      </div>
      <Skeleton className="mt-4 h-[300px] w-full bg-gray-200" />
    </BoxedContent>
  );
};

export default Loading;
