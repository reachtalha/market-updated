import React from 'react';
import ShopCard from '@/components/common/Buyer/Cards/ShopCard';
type Props = {
  markets: any;
};

const Markets = ({ markets }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {markets.length > 0 ? (
        markets.map((shop: any, i: number) => (
          <ShopCard
            key={i + Math.random()}
            id={shop.id}
            image={shop.coverImage}
            desc={shop.tagline}
            shop={shop.name}
            type={shop.category}
          />
        ))
      ) : (
        <div className="flex items-center justify-center w-[80vw] h-96">
          <h3 className="text-xl text-gray-500">No Shops Found</h3>
        </div>
      )}
    </div>
  );
};

export default Markets;
