import BoxedContent from '@/components/common/BoxedContent';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <>
      <Skeleton className="h-[500px] w-full bg-primary" />
      <BoxedContent className="pt-14 pb-20">
        <Skeleton className="h-[400px] w-full bg-gray-200" />
        <Skeleton className="mt-4 h-[400px] w-full bg-gray-200" />
      </BoxedContent>
    </>
  );
};

export default Loading;
