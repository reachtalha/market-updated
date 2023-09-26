import React from 'react';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
type Props = {
  products: any;
};

const Products = ({ products }: Props) => {
  return (
    <div className="gap-x-5 p-20 mt-8 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
      {products.length > 0 ? (
        products.map((_: any, i: number) => (
          <ProductCard
            key={i + Math.random()}
            id={_.id}
            image={_.coverImage}
            name={_.name}
            price={_.price}
            shop={_.shopName || 'some shop'}
            type={_.type}
          />
        ))
      ) : (
        <div className="text-center flex items-center justify-center  w-[80vw] md:!w-[80vw] h-[40vh] text-gray-500">
          No products found for you
        </div>
      )}
    </div>
  );
};

export default Products;
