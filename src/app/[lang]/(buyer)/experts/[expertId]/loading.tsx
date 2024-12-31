import BoxedContent from '@/components/common/BoxedContent';
import ProductCartSkeleton from '@/components/common/Skeleton/ProductCardSkeleton';

const Loading = () => {
  return (
    <>
      <div className="h-[500px] w-full bg-gray-200 animate-pulse bg-gradient-to-b from-black/40 to-transparent" />
      <BoxedContent className="mt-[-10%] md:mt-[-10%] pb-5">
        <div className="flex flex-col w-[90%] animate-pulse items-center mx-auto relative">
          <div className="flex w-full flex-row mb-5 gap-x-4 md:gap-x-8 items-end">
            <div className="w-[150px] z-20 h-[150px] ring-2 ring-offset-2 ring-neutral-300 md:w-[200px] md:h-[200px] lg:h-[250px] lg:w-[250px] bg-gray-200 rounded-full" />
            <div className="flex flex-col">
              <div className="h-14 w-28 bg-gray-200 rounded-md" />
              <ul className="flex gap-x-4 gap-y-2 mt-4 flex-wrap">
                <li className="w-10 h-6 bg-gray-200 rounded-md"></li>
                <li className="w-10 h-6 bg-gray-200 rounded-md"></li>
                <li className="w-10 h-6 bg-gray-200 rounded-md"></li>
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <p className="mt-7 lg:mt-10 w-28 h-6 bg-gray-200 rounded"></p>
            <p className="h-20 w-full bg-gray-200 rounded mt-2"></p>

            <div className="mt-8 lg:mt-10">
              <p className="mt-7 lg:mt-10 w-28 h-6 bg-gray-200 rounded"></p>
              <ul className="flex gap-x-4 gap-y-2 mt-4 flex-wrap">
                <li className="w-16 h-8 bg-gray-200 rounded"></li>
                <li className="w-16 h-8 bg-gray-200 rounded"></li>
                <li className="w-16 h-8 bg-gray-200 rounded"></li>
              </ul>
            </div>
          </div>
          <div className="my-5">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <ProductCartSkeleton key={Math.random() + index} />
            ))}
          </div>
        </div>
      </BoxedContent>
    </>
  );
};

export default Loading;
