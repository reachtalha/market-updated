import BoxedContent from '@/components/common/BoxedContent';
import React from 'react';

const Loading = () => {
  return (
    <BoxedContent className="py-20">
      <div className="grid items-center h-screen gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-16">
        <div className="col-span-2 h-full bg-gray-200 rounded animate-pulse"></div>
        <div className="w-full h-full md:col-span-1 animate-puls space-y-5">
          <div className="h-8 bg-gray-200 border-b-2 border-gray-200 " />
          <span className="h-6 bg-gray-200 capitalize " />
          <div className="h-48 bg-gray-200 border-b-2 border-gray-200 " />
          <div className="border-t-2 border-gray-200 h-48 bg-gray-200"></div>
        </div>
      </div>
      <div className="w-full h-56 my-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="py-5 md:py-10">
        <div className="w-full h-56 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </BoxedContent>
  );
};

export default Loading;
