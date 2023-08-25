import BoxedContent from '@/components/common/BoxedContent';
import ProductCartSkeleton from '@/components/common/Skeleton/ProductCardSkeleton';

const Loading = () => {
  return (
    <>
      <div className="h-screen flex items-end justify-start w-full bg-gray-200 bg-gradient-to-b from-black/40 to-transparent">
        <header className="flex px-3 md:px-6 w-full animate-pulse justify-between items-center mb-14">
          <div className="space-y-3">
            <div className="bg-gray-100 rounded animate-pulse h-10 w-28" />
            <div className="bg-gray-100 rounded animate-pulse h-6 sm:w-48" />
          </div>
          <div className="self-end flex items-center gap-4 h-12 w-24 rounded-full bg-gray-100"></div>
        </header>
      </div>
      <BoxedContent className="py-10">
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <ProductCartSkeleton key={Math.random() + index} />
          ))}
        </div>
        <div className="w-full h-56 my-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="py-5 md:py-10">
          <div className="w-full h-56 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </BoxedContent>
    </>
  );
};

export default Loading;
