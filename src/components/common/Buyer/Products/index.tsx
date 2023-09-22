'use client';
import { useEffect, useState, useRef } from 'react';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import BoxedContent from '@/components/common/BoxedContent';
import ProductCategories, { Category } from '@/components/common/Buyer/Products/ProductCategories';
import ProductHeader from '@/components/common/Buyer/Products/ProductHeader';
import OrganicSimplifiedSection from '../OrganicSimplifiedSection';
import useCategorySlug from '@/hooks/useCategorySlug';
import { ProductsLoader } from '@/components/common/Skeleton/SkeletonLoader';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import { Button } from '@/components/ui/button';
import {
  getDocs,
  collection,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  CollectionReference,
  Query,
  QueryFieldFilterConstraint,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSWR, { mutate } from 'swr';

import FeaturesShops from '../FeaturesShops';
import useSortingStore from '@/state/useSortingStore';
import useProductTypeSlug from '@/hooks/useProductTypeSlug';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';

const RECORDS_PER_PAGE = 6;
const getProducts: any = async (
  category: string,
  type?: string,
  lastDoc?: any,
  rating?: string,
  price?: any
): Promise<any> => {
  let products: any = [];
  let queries: any = [];
  let orderby: any = [];
  let queryBase: CollectionReference | Query = collection(db, 'products');
  if (category?.trim() === 'organic clothing') {
    category = 'organic clothing & apparel';
  }

  // if (price?.min) {
  //   queries.push(where('price', '>=', parseInt(price.min)));
  //   queries.push(where('price', '<=', parseInt(price.max)));
  //   orderby.push(orderBy('pricing'));
  // }

  if (rating) {
    queries.push(where('rating', '>=', parseInt(rating)));
    orderby.push(orderBy('rating'));
  }
  if (category && category?.toLowerCase() !== 'all') {
    queries.push(where('category', '==', `${category.toLowerCase()}`));
  }
  if (type != null) {
    queries.push(where('type', '==', `${type.toLowerCase()}`));
  }
  orderby.push(orderBy('__name__'));

  if (!lastDoc) {
    const docs = await getDocs(query(queryBase, ...orderby, limit(1)));

    lastDoc = docs.docs[0]?.data();
    products.push({ id: docs.docs[0]?.id, ...lastDoc });
  }

  const docRef = await getDocs(
    query(
      queryBase,
      ...queries,
      ...orderby,
      startAfter(rating ? lastDoc.rating : lastDoc.id),
      limit(RECORDS_PER_PAGE)
    )
  );

  products = [...products, ...docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }))];

  return [...products];
};

type ProductsProps = {
  categories: Category[];
  foryou?: boolean;
};
export default function Products({ categories }: ProductsProps) {
  const category = useCategorySlug();
  const type = useProductTypeSlug();
  const { ref, inView } = useInView();
  const params = useSearchParams();
  const rating = params.get('rating');
  const min = params.get('min');
  const max = params.get('max');

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    category === 'all'
      ? 'All'
      : categories?.find((cat) => cat.name.split('&')[0] === category)?.subCategories[0]
  );

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [productsEnded, setProductsEnded] = useState<boolean>(false);
  const sortProductsBy = useSortingStore((state: any) => state.sortProductsBy);
  const [loading, setLoading] = useState<any>(null);

  let { data, error, isLoading } = useSWR(
    [`products-${category}`, `products-${type}`, selectedSubCategory],
    () => getProducts(category, type, false, rating, { min, max })
  );

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  useEffect(() => {
    setSelectedSubCategory(
      category === 'All'
        ? 'All'
        : categories?.find((cat) => cat.name.split('&')[0] === category)?.subCategories[0]
    );
  }, [category, categories]);

  useEffect(() => {
    if (selectedSubCategory) {
      mutate([`products-${category}`, `products-${type}`, selectedSubCategory]);
    }
  }, [selectedSubCategory, category]);

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
    setLoading(true);
    try {
      const response = await getProducts(category, type, products[products.length - 1], rating, {
        min,
        max
      });
      if (response.length < 6) setProductsEnded(true);

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
    console.log(error);
    return <Error className="h-screen w-full grid place-content-center" />;
  }

  return (
    <div>
      <BoxedContent className="flex gap-x-5 py-20 mt-8">
        <ProductCategories
          setSelectedSubCategory={setSelectedSubCategory}
          selectedCategory={category}
          categories={[
            {
              name: 'All',
              subCategories: [],
              image: '',
              slug: 'All',
              href: '/products?category'
            },
            ...categories
          ]}
        />
        <div className="flex-1 space-y-4">
          <ProductHeader
            setSelectedSubCategory={setSelectedSubCategory}
            selectedSubCategory={selectedSubCategory}
            selectedCategory={category}
            categories={categories}
          />
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filteredProducts.length > 0 ? (
              filteredProducts
                .filter((_) => {
                  if (selectedSubCategory === 'All' || !selectedSubCategory) return true;
                  return _.type.toLowerCase() === selectedSubCategory?.toLowerCase();
                })
                .map((_: any, i: number) => (
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
                No products found
              </div>
            )}
          </div>
          {filteredProducts.length > 0 && (
            <div className="w-full  flex items-center justify-center mt-5">
              {productsEnded ? (
                <span>Sorry! No more products to show</span>
              ) : (
                <div ref={ref}>
                  <Loader />
                </div>
              )}
            </div>
          )}
        </div>
      </BoxedContent>
    </div>
  );
}
