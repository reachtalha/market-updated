import React from 'react';

const ProductCartSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-80 w-full bg-gray-200 rounded"></div>
      <div className="mt-3 flex justify-between items-start">
        <p className="uppercase text-sm tracking-wide w-full rounded bg-gray-200"></p>
      </div>
    </div>
  );
};

export default ProductCartSkeleton;
