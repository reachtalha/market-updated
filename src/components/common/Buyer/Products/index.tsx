'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import BoxedContent from '@/components/common/BoxedContent';
import ProductCategories, { Category } from '@/components/common/Buyer/Products/ProductCategories';
import ProductHeader from '@/components/common/Buyer/Products/ProductHeader';
import useCategorySlug from '@/hooks/useCategorySlug';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

import { getDocs, getDoc, collection, query, where, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import useSWR, { mutate } from 'swr';

const getProducts: any = async (category: string): Promise<any> => {
  let products: any = [];
  console.log('here');
  if (category === 'All' || !category) {
    const docRef = await getDocs(query(collection(db, 'products')));
    products = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    const docRef = await getDocs(
      query(collection(db, 'products'), where('type', '==', `${category.toLowerCase()}`))
    );
    products = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  products = await Promise.all(
    products.map(async (product: any) => {
      const docRef = await getDoc(doc(db, 'shops', product.shopId));

      if (docRef.exists()) {
        product.shopName = docRef?.data()?.name;
      }

      return product;
    })
  );

  return products;
};

type ProductsProps = {
  categories: Category[];
};
export default function Products({ categories }: ProductsProps) {
  const category = useCategorySlug();

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    category === 'all'
      ? 'All'
      : categories.find((cat) => cat.name.split('&')[0] === category)?.subCategories[0]
  );

  useEffect(() => {
    setSelectedSubCategory(
      category === 'All'
        ? 'All'
        : categories.find((cat) => cat.name.split('&')[0] === category)?.subCategories[0]
    );
  }, [category, categories]);

  useEffect(() => {
    if (selectedSubCategory) {
      mutate(['products', selectedSubCategory]);
    }
  }, [selectedSubCategory]);

  const {
    data: products,
    error: productsError,
    isLoading: productsIsLoading
  } = useSWR(['products', selectedSubCategory], () => getProducts(selectedSubCategory));

  if (productsIsLoading)
    return (
      <div className="w-screen h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (productsError) return <Error />;

  return (
    <BoxedContent className="flex gap-x-5  py-20">
      <ProductCategories
        setSelectedSubCategory={setSelectedSubCategory}
        selectedCategory={category}
        categories={categories}
      />
      <div className="flex-1 space-y-4">
        <ProductHeader selectedCategory={category} categories={categories} />
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {products.length > 0 ? (
            products.map((_: any, i: number) => (
              <ProductCard
                key={i + Math.random()}
                id={_.id}
                image={_.coverImage}
                name={_.name}
                price={
                  _.SKU?.length === 1
                    ? _.SKU[0].price
                    : _.SKU.sort((a: any, b: any) => a.price - b.price)[0].price
                }
                shop={_.shopName}
                type={_.type}
              />
            ))
          ) : (
            <div className="text-center flex items-center justify-center   w-[95vw] md:!w-[80vw] h-[40vh] text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>
    </BoxedContent>
  );
}
