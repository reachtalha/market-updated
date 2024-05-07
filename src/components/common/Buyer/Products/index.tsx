'use client';
import { useEffect, useState, useRef } from 'react';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import BoxedContent from '@/components/common/BoxedContent';
import ProductCategories, { Category } from '@/components/common/Buyer/Products/ProductCategories';
import ProductHeader from '@/components/common/Buyer/Products/ProductHeader';
import useCategorySlug from '@/hooks/useCategorySlug';
import { ProductsLoader } from '@/components/common/Skeleton/SkeletonLoader';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import {
  getDocs,
  collection,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  CollectionReference,
  Query
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSWR, { mutate } from 'swr';

import useSortingStore from '@/state/useSortingStore';
import useProductTypeSlug from '@/hooks/useProductTypeSlug';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';

const RECORDS_PER_PAGE = 11;
const getProducts: any = async (category: string, type?: string, rating?: string): Promise<any> => {
  let queries: any = [];
  let orderby: any = [];
  let queryBase: CollectionReference | Query = collection(db, 'products');
  if (category?.trim() === 'organic clothing') {
    category = 'organic clothing & apparel';
  }

  if (rating) {
    queries.push(where('rating', '>=', Number(rating)));
    orderby.push(orderBy('rating'));
  }
  if (category && category?.toLowerCase() !== 'all') {
    queries.push(where('category', '==', `${category.toLowerCase()}`));
  }
  if (type != null && type.toLowerCase() !== 'all') {
    queries.push(where('type', '==', `${type.toLowerCase()}`));
  }
  if (orderBy.length === 0) orderby.push(orderBy('submittedAt'));

  const docRef = await getDocs(query(queryBase, ...queries, ...orderby, limit(RECORDS_PER_PAGE)));

  return [...docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }))];
};

type ProductsProps = {
  categories: Category[];
};

export default function Products({ categories }: ProductsProps) {
  const category = useCategorySlug();
  const type = useProductTypeSlug();
  const { ref, inView } = useInView();
  const params = useSearchParams();
  const rating = params.get('rating');
  const min = params.get('min');
  const max = params.get('max');
  const [loading, setLoading] = useState(false);
  const selectedSubCategory = params.get('type') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [productsEnded, setProductsEnded] = useState<boolean>(false);
  const sortProductsBy = useSortingStore((state: any) => state.sortProductsBy);

  let { data, error, isLoading } = useSWR(
    [`products-${category}`, `products-${type}`, selectedSubCategory, rating],
    () => getProducts(category, type, rating)
  );

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  useEffect(() => {
    if (selectedSubCategory) {
      mutate([`products-${category}`, `products-${type}`, selectedSubCategory]);
    }
  }, [selectedSubCategory]);

  useEffect(() => {
    if (!products) return;

    switch (sortProductsBy) {
      case 'price':
        setFilteredProducts([...products].sort((a: any, b: any) => a.price - b.price));
        break;
      case 'name':
        setFilteredProducts([...products].sort((a: any, b: any) => a.name.localeCompare(b.name)));
        break;
      case 'reviews':
        setFilteredProducts([...products].sort((a: any, b: any) => b.rating - a.rating));
        break;
      default:
        setFilteredProducts(products);
    }
  }, [products, sortProductsBy]);

  const getNewProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts(category, type, products[products.length - 1], rating);
      if (response.length < RECORDS_PER_PAGE) setProductsEnded(true);

      if (response[response.length - 1]?.id !== products[products.length - 1]?.id)
        setProducts((prev) => [...prev, ...response]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      getNewProducts();
    }
  }, [inView]);

  if (isLoading) return <ProductsLoader />;
  if (error) {
    return <Error className="h-screen w-full grid place-content-center" />;
  }

  return (
    <div className="min-h-screen">
      <BoxedContent className="flex gap-x-5 py-20 mt-8">
        <ProductCategories
          categories={[
            {
              name: 'All',
              subCategories: [],
              image: '',
              slug: 'all',
              href: '/products?category'
            },
            ...categories
          ]}
        />
        <div className="flex-1 space-y-4">
          <ProductHeader categories={categories} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id + index}
                  id={product.id}
                  image={product.coverImage}
                  name={product.name}
                  price={product.price}
                  shop={product.shopName || 'some shop'}
                  type={product.type}
                />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-96 text-gray-500">
                No products found
              </div>
            )}
          </div>

          {filteredProducts.length > 0 && (
            <>
              {productsEnded ? (
                <p className="col-span-full mt-20 text-center">Sorry! No more products to show</p>
              ) : (
                loading && (
                  <div ref={ref} className="col-span-full flex items-center justify-center h-20">
                    <Loader />
                  </div>
                )
              )}
            </>
          )}
        </div>
      </BoxedContent>
    </div>
  );
}
