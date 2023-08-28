import BoxedContent from '@/components/common/BoxedContent';
import ProductCardSkeleton from '@/components/common/Skeleton/ProductCardSkeleton';
import MarketCardSkeleton from '@/components/common/Skeleton/MarketCardSkeletion';

export const ProductsLoader = () => {
  return (
    <BoxedContent className="flex gap-x-5 py-20 mt-8">
      <div className="hidden md:block w-48 space-y-4">
        <div className="w-full rounded h-4 bg-gray-200 animate-pulse" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex justify-between">
          <div className="w-12 rounded h-4 bg-gray-200 animate-pulse" />
          <div className="w-14 rounded h-4 bg-gray-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <ProductCardSkeleton key={Math.random() + index} />
          ))}
        </div>
      </div>
    </BoxedContent>
  );
};

export const MarketLoader = () => {
  return (
    <BoxedContent className="flex gap-x-5 py-20 mt-8">
      <div className="hidden md:block w-48 space-y-4">
        <div className="w-full rounded h-4 bg-gray-200 animate-pulse" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex justify-between">
          <div className="w-12 rounded h-4 bg-gray-200 animate-pulse" />
          <div className="w-14 rounded h-4 bg-gray-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <MarketCardSkeleton key={Math.random() + index} />
          ))}
        </div>
      </div>
    </BoxedContent>
  );
};

export const ExpertLoader = () => {
  return (
    <BoxedContent className="flex gap-x-5 py-20 mt-8">
      <div className="hidden md:block w-48 space-y-4">
        <div className="w-full rounded h-4 bg-gray-200 animate-pulse" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex justify-between">
          <div className="w-12 rounded h-4 bg-gray-200 animate-pulse" />
          <div className="w-14 rounded h-4 bg-gray-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div key={Math.random() + index} className="animate-pulse">
              <div className="h-80 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </BoxedContent>
  );
};

export const AccountsLoader = () => {
  return (
    <BoxedContent className="flex flex-col md:flex-row gap-x-5 py-20">
      <div className="flex flex-row md:flex-col w-full md:w-48 gap-4">
        <div className="w-1/3 md:w-full rounded h-4 bg-gray-200 animate-pulse" />
        <div className="w-1/3 md:w-full rounded h-4 bg-gray-200 animate-pulse" />
        <div className="w-1/3 md:w-full rounded h-4 bg-gray-200 animate-pulse" />
      </div>
      <div className="flex-1 h-[80vh] grid place-content-center">
        <div className="bg-gray-200 h-96 w-96 animate-pulse rounded-md" />
      </div>
    </BoxedContent>
  );
};
