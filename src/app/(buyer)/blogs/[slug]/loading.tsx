import BoxedContent from '@/components/common/BoxedContent';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <BoxedContent className="py-24">
      <Skeleton className="h-[400px] w-full bg-gray-200" />
      <Skeleton className="mt-4 h-[400px] w-full bg-gray-200" />
    </BoxedContent>
  );
};

export default Loading;
