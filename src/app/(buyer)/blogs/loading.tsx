import BoxedContent from '@/components/common/BoxedContent';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <BoxedContent className="py-24">
      <div className="h-8 w-40 bg-gray-200 animate-pulse mx-auto" />
      <p className="h-6 w-32 mt-2.5 bg-gray-200 animate-pulse mx-auto" />
      <div className="grid grid-cols-1 mt-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5]?.map((_, index) => (
          <Skeleton key={Math.random() + index} className="h-96 rounded w-full bg-gray-200" />
        ))}
      </div>
    </BoxedContent>
  );
};

export default Loading;
